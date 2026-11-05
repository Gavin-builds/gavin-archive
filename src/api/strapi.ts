/**
 * Strapi REST 客户端（只用到公共只读接口，无需鉴权）。
 */

const RAW_BASE_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337'

export const STRAPI_URL = RAW_BASE_URL.replace(/\/+$/, '')

/** Strapi 返回的单条记录；字段随内容类型变化，这里保持宽松类型 */
export type StrapiEntry = Record<string, any>

/** Strapi 集合接口的分页元信息 */
export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiCollectionResult {
  data: StrapiEntry[]
  pagination: StrapiPagination
}

export class StrapiRequestError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'StrapiRequestError'
    this.status = status
  }
}

/**
 * 请求一个集合。`params` 会原样拼进 query string，
 * 例如 `{ locale: 'zh-CN', 'pagination[page]': '1', 'pagination[pageSize]': '10' }`。
 *
 * 除了记录本身，这里还返回 `meta.pagination`，让调用方据此判断是否还有下一页，
 * 而不是一次性把整张表拉下来。
 */
export const fetchCollection = async (
  endpoint: string,
  params: Record<string, string>,
): Promise<StrapiCollectionResult> => {
  const query = new URLSearchParams(params)
  const url = `${STRAPI_URL}/api/${endpoint}?${query.toString()}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new StrapiRequestError(`请求 ${url} 失败（HTTP ${response.status}）`, response.status)
  }

  const body = (await response.json()) as {
    data?: StrapiEntry[]
    meta?: { pagination?: StrapiPagination }
  }

  return {
    data: body.data ?? [],
    pagination: body.meta?.pagination ?? {
      page: Number(params['pagination[page]'] ?? 1),
      pageSize: Number(params['pagination[pageSize]'] ?? 0),
      pageCount: 0,
      total: 0,
    },
  }
}

/**
 * 请求一个单类型（返回对象而不是数组），例如 `/api/ui-text?locale=zh-CN`。
 * 未播种时 Strapi 返回 `data: null`，这里统一收敛成 null。
 */
export const fetchSingle = async (
  endpoint: string,
  params: Record<string, string>,
): Promise<StrapiEntry | null> => {
  const query = new URLSearchParams(params)
  const url = `${STRAPI_URL}/api/${endpoint}?${query.toString()}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new StrapiRequestError(`请求 ${url} 失败（HTTP ${response.status}）`, response.status)
  }

  const body = (await response.json()) as { data?: StrapiEntry | null }

  return body.data ?? null
}
