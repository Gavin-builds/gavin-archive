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

export function useGitHub() {
  const profile = ref<GitHubProfile | null>(null)
  const repositories = ref<GitHubRepository[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchGitHub = async () => {
    loading.value = true
    error.value = null

    try {
      const [profileResponse, repositoriesResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${USERNAME}`),
        fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=12`),
      ])

      if (!profileResponse.ok || !repositoriesResponse.ok) {
        throw new Error('GitHub API unavailable')
      }

      profile.value = await profileResponse.json() as GitHubProfile
      const allRepositories = await repositoriesResponse.json() as GitHubRepository[]
      repositories.value = allRepositories.filter(repository => !repository.fork)
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Unknown error'
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
