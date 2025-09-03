import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { collections } from '@/content/config'

describe('Content Collections', () => {
  describe('topicCollection', () => {
    // Extract the schema from the collection definition
    const getTopicSchema = () => {
      const schemaFn = (collections.topic as any).schema
      return schemaFn({ image: () => z.any() })
    }

    it('should validate valid topic data', () => {
      const validTopic = {
        title: 'Test Topic',
        isPublic: true,
        tags: ['tag1', 'tag2'],
        pubDate: new Date('2024-01-01'),
        author: 'Test Author',
        image: {
          url: 'https://example.com/image.jpg',
          alt: 'Test image'
        },
        cover: 'cover.jpg',
        coverAlt: 'Cover image description'
      }

      const schema = getTopicSchema()
      const result = schema.safeParse(validTopic)
      expect(result.success).toBe(true)
    })

    it('should validate topic with minimal required fields', () => {
      const minimalTopic = {
        cover: 'cover.jpg',
        coverAlt: 'Cover description'
      }

      const schema = getTopicSchema()
      const result = schema.safeParse(minimalTopic)
      expect(result.success).toBe(true)
    })

    it('should allow optional fields to be undefined', () => {
      const topicWithOptionals = {
        title: undefined,
        isPublic: undefined,
        tags: undefined,
        pubDate: undefined,
        author: undefined,
        image: undefined,
        cover: 'cover.jpg',
        coverAlt: 'Cover alt'
      }

      const schema = getTopicSchema()
      const result = schema.safeParse(topicWithOptionals)
      expect(result.success).toBe(true)
    })

    it('should fail with invalid date', () => {
      const invalidTopic = {
        pubDate: 'not-a-date',
        cover: 'cover.jpg',
        coverAlt: 'Cover alt'
      }

      const schema = getTopicSchema()
      const result = schema.safeParse(invalidTopic)
      expect(result.success).toBe(false)
    })

    it('should fail with invalid tags array', () => {
      const invalidTopic = {
        tags: 'not-an-array',
        cover: 'cover.jpg',
        coverAlt: 'Cover alt'
      }

      const schema = getTopicSchema()
      const result = schema.safeParse(invalidTopic)
      expect(result.success).toBe(false)
    })

    it('should fail without required coverAlt', () => {
      const invalidTopic = {
        cover: 'cover.jpg'
      }

      const schema = getTopicSchema()
      const result = schema.safeParse(invalidTopic)
      expect(result.success).toBe(false)
    })
  })

  describe('houseCollection', () => {
    // Extract the schema from the collection definition
    const getHouseSchema = () => {
      const schemaFn = (collections.house as any).schema
      return schemaFn({ image: () => z.any() })
    }

    it('should validate valid house data', () => {
      const validHouse = {
        name: 'Test House',
        isPublic: true,
        tags: ['tag1', 'tag2'],
        equipments: ['equipment1', 'equipment2'],
        pubDate: new Date('2024-01-01'),
        owner: 'Test Owner',
        cover: 'cover.jpg',
        coverWidth: 1920,
        coverHeight: 1080,
        coverAlt: 'House cover',
        booking: 'https://booking.com',
        contact: 'contact@example.com',
        address: '123 Test Street',
        description: 'A nice house',
        price: '¥100,000',
        map_embed: '<iframe>...</iframe>',
        forRent: 'Available'
      }

      const schema = getHouseSchema()
      const result = schema.safeParse(validHouse)
      expect(result.success).toBe(true)
    })

    it('should validate house with all fields optional', () => {
      const minimalHouse = {}

      const schema = getHouseSchema()
      const result = schema.safeParse(minimalHouse)
      expect(result.success).toBe(true)
    })

    it('should validate house with partial data', () => {
      const partialHouse = {
        name: 'Partial House',
        address: 'Some Address',
        price: '¥50,000'
      }

      const schema = getHouseSchema()
      const result = schema.safeParse(partialHouse)
      expect(result.success).toBe(true)
    })

    it('should fail with invalid equipments array', () => {
      const invalidHouse = {
        equipments: 'not-an-array'
      }

      const schema = getHouseSchema()
      const result = schema.safeParse(invalidHouse)
      expect(result.success).toBe(false)
    })

    it('should fail with invalid coverWidth type', () => {
      const invalidHouse = {
        coverWidth: '1920' // Should be number
      }

      const schema = getHouseSchema()
      const result = schema.safeParse(invalidHouse)
      expect(result.success).toBe(false)
    })

    it('should fail with invalid isPublic type', () => {
      const invalidHouse = {
        isPublic: 'yes' // Should be boolean
      }

      const schema = getHouseSchema()
      const result = schema.safeParse(invalidHouse)
      expect(result.success).toBe(false)
    })

    it('should accept undefined for all optional fields', () => {
      const houseWithUndefined = {
        name: undefined,
        isPublic: undefined,
        tags: undefined,
        equipments: undefined,
        pubDate: undefined,
        owner: undefined,
        cover: undefined,
        coverWidth: undefined,
        coverHeight: undefined,
        coverAlt: undefined,
        booking: undefined,
        contact: undefined,
        address: undefined,
        description: undefined,
        price: undefined,
        map_embed: undefined,
        forRent: undefined
      }

      const schema = getHouseSchema()
      const result = schema.safeParse(houseWithUndefined)
      expect(result.success).toBe(true)
    })
  })

  describe('collections export', () => {
    it('should export topic and house collections', () => {
      expect(collections).toHaveProperty('topic')
      expect(collections).toHaveProperty('house')
    })

    it('should have correct collection types', () => {
      expect(collections.topic).toBeDefined()
      expect(collections.house).toBeDefined()
      expect(typeof (collections.topic as any).schema).toBe('function')
      expect(typeof (collections.house as any).schema).toBe('function')
    })
  })
})