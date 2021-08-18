import React from 'react'
import styled from '@emotion/styled'

import { useSelector } from 'containers/project-data-container'
import { useSearch } from 'components/search/search-container'
import { RandomFeaturedProject } from 'components/home/featured-projects'

import {
  paginateItemList,
  PaginationContainer
} from 'components/core/pagination'
import { ProjectPaginatedList } from 'components/search/project-paginated-list'
import { MainContent, PageHeader } from 'components/core'
import { StarIcon } from 'components/core/icons'
import { getFeaturedProjects } from 'selectors'

export const ExplorePage = () => {
  const { page, sortOption } = useSearch({ defaultSortOptionId: 'newest' })
  const projects = useSelector(getFeaturedProjects(sortOption.id))

  const total = projects.length
  const limit = 30
  const paginatedProjects = paginateItemList(projects, page, { limit })

  return (
    <MainContent>
      <PaginationContainer.Provider
        initialState={{ total, currentPageNumber: page, limit }}
      >
        <PageDescription>
          An arbitrary selection of important projects with distinct logos.
        </PageDescription>
        <RandomFeaturedProject />
        <ProjectPaginatedList
          projects={paginatedProjects}
          page={page}
          total={total}
          limit={limit}
          sortOption={sortOption}
        />
      </PaginationContainer.Provider>
    </MainContent>
  )
}

const PageDescription = styled.div`
  padding-left: 1rem;
  border-left: 2px solid #fa9e59;
  margin-bottom: 1rem;
`
