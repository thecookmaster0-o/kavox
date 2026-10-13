import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const outputDir = path.resolve('out')
const maxBytes = 25 * 1024 * 1024

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(filePath)))
    else files.push(filePath)
  }

  return files
}

const files = await walk(outputDir).catch(() => {
  throw new Error('Cloudflare Pages output is missing: expected an out/ directory.')
})

if (!files.some((filePath) => path.relative(outputDir, filePath) === 'index.html')) {
  throw new Error('Cloudflare Pages output is missing out/index.html.')
}

for (const filePath of files) {
  const relativePath = path.relative(outputDir, filePath)
  if (relativePath.split(path.sep).includes('.next')) {
    throw new Error(`Next.js cache/build output found inside out/: ${relativePath}`)
  }

  const size = (await stat(filePath)).size
  if (size > maxBytes) {
    throw new Error(`Cloudflare Pages file exceeds 25 MB: ${relativePath}`)
  }
}

console.log(`Cloudflare Pages output verified: ${files.length} static files, no .next cache, no files over 25 MB.`)
