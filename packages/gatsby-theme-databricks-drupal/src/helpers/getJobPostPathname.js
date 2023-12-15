import stringSlugify from "./stringSlugify"

const getJobPostPathname = (node) => {
  // const [office] = node.offices ? node.offices : []
  // const officeSlug = stringSlugify(office ? `${office.name}` : ``)
  const [department] = node.departments ? node.departments : []
  const departmentSlug = stringSlugify(department ? `${department.name}` : ``)
  const jobSlug = stringSlugify(`${node.title}`)

  return `/company/careers/${departmentSlug}/${jobSlug}-${node.gh_Id}`
}

export default getJobPostPathname
