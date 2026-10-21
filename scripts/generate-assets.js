#!/usr/bin/env node
// Generate OG image and PWA icons from SVG
// Run: node scripts/generate-assets.js

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'

const publicDir = join(process.cwd(), 'public')
const imagesDir = join(publicDir, 'images')

async function generateAssets() {
  console.log('🎨 Generating assets from SVG...')
  
  const svgPath = join(imagesDir, 'og-default.svg')
  
  // Generate og-default.jpg (1200x630)
  console.log('  → og-default.jpg (1200x630)')
  await sharp(svgPath)
    .resize(1200, 630, { fit: 'fill' })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(join(imagesDir, 'og-default.jpg'))
  
  // Generate og-default.png (1200x630) as fallback
  console.log('  → og-default.png (1200x630)')
  await sharp(svgPath)
    .resize(1200, 630, { fit: 'fill' })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(join(imagesDir, 'og-default.png'))
  
  // Generate favicon.ico (32x32)
  console.log('  → favicon.ico (32x32)')
  await sharp(svgPath)
    .resize(32, 32, { fit: 'contain', background: { r: 13, g: 138, b: 94 } })
    .toFile(join(imagesDir, 'favicon.ico'))
  
  // Generate favicon-16x16.png
  console.log('  → favicon-16x16.png')
  await sharp(svgPath)
    .resize(16, 16, { fit: 'contain', background: { r: 13, g: 138, b: 94 } })
    .png()
    .toFile(join(imagesDir, 'favicon-16x16.png'))
  
  // Generate favicon-32x32.png
  console.log('  → favicon-32x32.png')
  await sharp(svgPath)
    .resize(32, 32, { fit: 'contain', background: { r: 13, g: 138, b: 94 } })
    .png()
    .toFile(join(imagesDir, 'favicon-32x32.png'))
  
  // Generate apple-touch-icon.png (180x180)
  console.log('  → apple-touch-icon.png (180x180)')
  await sharp(svgPath)
    .resize(180, 180, { fit: 'contain', background: { r: 13, g: 138, b: 94 } })
    .png()
    .toFile(join(imagesDir, 'apple-touch-icon.png'))
  
  // Generate PWA icons
  console.log('  → icon-192.png (192x192)')
  await sharp(svgPath)
    .resize(192, 192, { fit: 'contain', background: { r: 13, g: 138, b: 94 } })
    .png()
    .toFile(join(imagesDir, 'icon-192.png'))
  
  console.log('  → icon-512.png (512x512)')
  await sharp(svgPath)
    .resize(512, 512, { fit: 'contain', background: { r: 13, g: 138, b: 94 } })
    .png()
    .toFile(join(imagesDir, 'icon-512.png'))
  
  // Generate maskable icons (with padding)
  console.log('  → icon-192-maskable.png')
  await sharp(svgPath)
    .resize(192, 192, { 
      fit: 'contain', 
      background: { r: 13, g: 138, b: 94 } 
    })
    .extend({
      top: 24,
      bottom: 24,
      left: 24,
      right: 24,
      background: { r: 13, g: 138, b: 94 }
    })
    .png()
    .toFile(join(imagesDir, 'icon-192-maskable.png'))
  
  console.log('  → icon-512-maskable.png')
  await sharp(svgPath)
    .resize(512, 512, { 
      fit: 'contain', 
      background: { r: 13, g: 138, b: 94 } 
    })
    .extend({
      top: 64,
      bottom: 64,
      left: 64,
      right: 64,
      background: { r: 13, g: 138, b: 94 }
    })
    .png()
    .toFile(join(imagesDir, 'icon-512-maskable.png'))
  
  console.log('✅ All assets generated successfully!')
}

generateAssets().catch(err => {
  console.error('❌ Error generating assets:', err)
  process.exit(1)
})