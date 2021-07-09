import { Request, Response } from 'express'
import { promises as fs } from 'fs'
import path from 'path'

const parsePath = (req: Request): string => path.join(__dirname, '../public', req.url || '')

export const read = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(parsePath(req), 'utf-8')
    res.status(200).type('application/json').end(data)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    res.status(404).type('text/plain').end('Error reading file')
  }
}

export const write = async (req: Request, res: Response) => {
  let data: string = ''
  req.on('data', chunk => data += chunk)
  req.on('end', async () => {
    try {
      await fs.writeFile(parsePath(req), data)
      res.status(201).type('text/plain').end('File writted')
    } catch (err) {
      console.error(`Error: ${err.message}`)
      res.status(404).type('text/plain').end('Error writting file')
    }
  })
}

export const update = async (req: Request, res: Response) => {
  let data: string = ''
  req.on('data', chunk => data += chunk)
  req.on('end', async () => {
    try {
      const filePath: string = parsePath(req)
      const file: string = await fs.readFile(filePath, 'utf-8')
      const total: Object = { ...JSON.parse(file), ...JSON.parse(data) }
      await fs.writeFile(filePath, JSON.stringify(total, null, 2))
      res.status(200).type('text/plain').end('File updated')
    } catch (err) {
      console.error(`Error: ${err.message}`)
      res.status(400).type('text/plain').end('Error updating file')
    }
  })
}

export const remove = async (req: Request, res: Response) => {
  try {
    await fs.unlink(parsePath(req))
    res.status(200).type('text/plain').end('File deleted')
  } catch (err) {
    console.error(`Error: ${err.message}`)
    res.status(400).type('text/plain').end('Error deleting file')
  }
}