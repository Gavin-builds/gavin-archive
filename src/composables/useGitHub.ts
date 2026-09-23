import { onMounted, ref } from 'vue'

export interface GitHubRepository {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
}

export interface GitHubProfile {
  login: string
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  bio: string | null
}

const USERNAME = 'Gavin-builds'

export type GitHubErrorCode = 'unavailable' | 'network'

export function useGitHub() {
  const profile = ref<GitHubProfile | null>(null)
  const repositories = ref<GitHubRepository[]>([])
  const loading = ref(true)
  const error = ref<GitHubErrorCode | null>(null)

  const fetchGitHub = async () => {
    loading.value = true
    error.value = null

    try {
      const [profileResponse, repositoriesResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${USERNAME}`),
        fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=12`),
      ])

      if (!profileResponse.ok || !repositoriesResponse.ok) {
        throw new Error('unavailable')
      }

      profile.value = await profileResponse.json() as GitHubProfile
      const allRepositories = await repositoriesResponse.json() as GitHubRepository[]
      repositories.value = allRepositories.filter(repository => !repository.fork)
    } catch (cause) {
      // HTTP 状态异常与网络中断分别给视图一个可翻译的错误码
      error.value = cause instanceof Error && cause.message === 'unavailable'
        ? 'unavailable'
        : 'network'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchGitHub)

  return {
    profile,
    repositories,
    loading,
    error,
    username: USERNAME,
    refresh: fetchGitHub,
  }
}
