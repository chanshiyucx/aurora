export default {
  queryArchivesCount: ({ username, repository }) => `
    query { 
      repository(owner:"${username}", name: "${repository}") {
        issues(states:OPEN) {
          totalCount
        }
      }
    }
  `,
  queryMoodCount: ({ username, repository }) => `
    query { 
      repository(owner:"${username}", name: "${repository}") {
        issues(states:CLOSED, labels: Mood) {
          totalCount
        }
      }
    }
  `
}
