import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import BaseLayout from "gatsby-theme-databricks-drupal/src/components/base-layout"
import getJobPostPathname from "gatsby-theme-databricks-drupal/src/helpers/getJobPostPathname"
import JobRow from "databricks-ui/src/components/JobRow"

const careersDepartmentPage = ({ data, location: { pathname } }) => {
  const department = data.greenhouseDepartment
  const hasJobs = Boolean(department.jobs && department.jobs.length)

  const seo = {
    // metaTags: article.entityMetatags,
    // image: article?.fieldMedia?.entity?.fieldMediaImage,
    urls: {
      current: pathname,
    },
  }

  return (
    <BaseLayout seo={seo}>
      <section className='bg-gray-warm-medium'>
        <div className='xxl:max-w-[1456px] mx-auto flex w-11/12 flex-col px-2 py-6 lg:max-w-[1146px]'>
          <h1>{department.name}</h1>
          {hasJobs &&
            department.jobs.map((job) => (
              <JobRow
                to={getJobPostPathname(job)}
                title={job.title}
                office={job.location.name}
              />
            ))}
        </div>
      </section>
    </BaseLayout>
  )
}
export default careersDepartmentPage

careersDepartmentPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      landingPage: PropTypes.shape({
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldComponents: PropTypes.arrayOf(PropTypes.shape({})),
        fieldDisplayBackgroundImage: PropTypes.bool,
      }),
    }),
    greenhouseJob: PropTypes.string,
  }).isRequired,
  pageContext: PropTypes.shape().isRequired,
}

export const query = graphql`
  query DepartmentPageQuery($id: String!) {
    greenhouseDepartment(id: { eq: $id }) {
      name
      jobs {
        ...JobQueryFragment
        location {
          name
        }
        departments {
          name
        }
        offices {
          name
        }
      }
    }
  }
`
