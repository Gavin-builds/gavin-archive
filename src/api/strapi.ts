/**
 * Strapi REST 客户端（只用到公共只读接口，无需鉴权）。
 */

const RAW_BASE_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337'

export const STRAPI_URL = RAW_BASE_URL.replace(/\/+$/, '')

/** Strapi 返回的单条记录；字段随内容类型变化，这里保持宽松类型 */
export type StrapiEntry = Record<string, any>

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
 * 例如 `{ locale: 'zh-CN', 'pagination[pageSize]': '100' }`。
 */
export const fetchCollection = async (
  endpoint: string,
  params: Record<string, string>,
): Promise<StrapiEntry[]> => {
  const query = new URLSearchParams(params)
  const url = `${STRAPI_URL}/api/${endpoint}?${query.toString()}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new StrapiRequestError(`请求 ${url} 失败（HTTP ${response.status}）`, response.status)
  }

  const body = (await response.json()) as { data?: StrapiEntry[] }

  return body.data ?? []
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
