# TopTal

## Build and run

Install dependencies and build project:

> npm run build

Start webpack dev server and open in browser:

> npm run start

## Task

The task is to implement GitHub client that will need to perform the following actions:
- add the autocomplete for searching for GiHub users
- list the user repositoriesª
- list the most starred GiHub repos that were created in the last 30 days

- There is a searchbar autocomplete for GiHub users
- A checkbox to filter only the most starred repos

The list will contain cards that need to display the information listed below:
- Repository name
- Repository description
- Number of stars for the repo.
- Number of issues for the repo.
- Username and avatar of the owner.

Follow this design: https://www.figma.com/file/sN2xNgPcXRvelKwPTU0jCp/Repo-Card?node-id=0%3A1

API URLs:
- https://api.github.com/search/users?q=[search]
- https://api.github.com/users/[username]/repos
- https://api.github.com/search/repositories?q=created:[YYYY-MM-DD]&sort=stars&order=desc&page=[PAGE-NUMBER]

==== EXTRA =====
- Add pagination
