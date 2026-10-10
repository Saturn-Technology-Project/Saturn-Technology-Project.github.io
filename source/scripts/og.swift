import AppKit
import Foundation

let width = 1200
let height = 630
let outPath = CommandLine.arguments[1]
let logoPath = CommandLine.arguments[2]

let image = NSImage(size: NSSize(width: width, height: height))
image.lockFocus()

NSColor(srgbRed: 0xF0 / 255, green: 0xEE / 255, blue: 0xE6 / 255, alpha: 1).setFill()
NSRect(x: 0, y: 0, width: width, height: height).fill()

NSColor(srgbRed: 0xD9 / 255, green: 0x77 / 255, blue: 0x57 / 255, alpha: 1).setFill()
NSRect(x: 0, y: 0, width: 12, height: height).fill()

let ink = NSColor(srgbRed: 0x14 / 255, green: 0x14 / 255, blue: 0x13 / 255, alpha: 1)
let muted = NSColor(srgbRed: 0x5E / 255, green: 0x5D / 255, blue: 0x59 / 255, alpha: 1)

if let logo = NSImage(contentsOfFile: logoPath) {
  let side: CGFloat = 220
  let logoRect = NSRect(x: 96, y: (CGFloat(height) - side) / 2, width: side, height: side)
  NSGraphicsContext.saveGraphicsState()
  NSBezierPath(roundedRect: logoRect, xRadius: 48, yRadius: 48).addClip()
  logo.draw(in: logoRect)
  NSGraphicsContext.restoreGraphicsState()
}

let titleFont = NSFont(name: "Georgia", size: 84) ?? NSFont.systemFont(ofSize: 84)
let bodyFont = NSFont(name: "Georgia", size: 32) ?? NSFont.systemFont(ofSize: 32)
let metaFont = NSFont.systemFont(ofSize: 22, weight: .medium)

let title = "Saturn" as NSString
title.draw(
  at: NSPoint(x: 372, y: 340),
  withAttributes: [
    .font: titleFont,
    .foregroundColor: ink,
  ]
)

let body = "Secure MCP gateway\nfor AI agents." as NSString
body.draw(
  in: NSRect(x: 372, y: 210, width: 720, height: 110),
  withAttributes: [
    .font: bodyFont,
    .foregroundColor: ink,
    .paragraphStyle: {
      let style = NSMutableParagraphStyle()
      style.lineSpacing = 4
      return style
    }(),
  ]
)

let meta = "saturn.technology" as NSString
meta.draw(
  at: NSPoint(x: 372, y: 168),
  withAttributes: [
    .font: metaFont,
    .foregroundColor: muted,
  ]
)

image.unlockFocus()

guard
  let tiff = image.tiffRepresentation,
  let rep = NSBitmapImageRep(data: tiff),
  let png = rep.representation(using: .png, properties: [:])
else {
  fputs("failed to encode png\n", stderr)
  exit(1)
}

try png.write(to: URL(fileURLWithPath: outPath))
