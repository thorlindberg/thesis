const json = {
    "deliverables": [
        [
            "Technical Leadership",
            "UI/UX Design",
            "iOS Development",
            "Android Development"
        ],
        [
            "Business development",
            "UI/UX Design",
            "Project management",
            "iOS Development",
            "Android Development"
        ],
        [
            "Technical Leadership",
            "iOS Development",
            "Android Development",
            "UI/UX Design"
        ],
        [
            "Project Management",
            "Web Development",
            "iOS Development",
            "Android Development",
            "Quality Assurance (QA)"
        ],
        [
            "Project Management",
            "iOS Development",
            "Android Development",
            "Quality Assurance (QA)"
        ],
        [
            "iOS Development",
            "Android Development",
            "Design"
        ],
        [
            "Project Management",
            "Tech Architecture consultancy",
            "iOS Development",
            "Android Development",
            "Quality Assurance (QA)",
            "UI/UX Design"
        ],
        [
            "Project Management",
            "iOS Development",
            "Android Development",
            "Business Development",
            "UI/UX Design",
            "IDP - Login solution",
            "DevOps"
        ],
        [
            "Android Development",
            "iOS Development",
            "Design Sprint",
            "UI/UX Design"
        ],
        [
            "Android Development",
            "iOS Development",
            "Backend Development",
            "Project Management"
        ],
        [
            "Android Development",
            "iOS Development",
            "UI/UX Design",
            "Flutter",
            "Project Management"
        ],
        [
            "UI/UX Design",
            "iOS Development"
        ],
        [
            "Android Development",
            "iOS Development",
            "Backend Development",
            "Web based admin system",
            "UI/UX Design",
            "Beacon-based automatic check-in system"
        ],
        [
            "Project Management",
            "iOS Development",
            "Android Development",
            "Backend Development",
            "Design"
        ],
        [
            "Business Development",
            "iOS Development",
            "Android Development",
            "Architecture",
            "Backend Development",
            "Project Management",
            "Quality Assurance (QA)",
            "UI/UX Design"
        ],
        [
            "Project Management",
            "iOS Development",
            "Android Development",
            "Quality Assurance (QA)",
            "UI/UX Design"
        ],
        [
            "Project Management",
            "iOS Development",
            "Android Development",
            "Quality Assurance (QA)"
        ],
        [
            "Project Management",
            "iOS Development",
            "Android Development",
            "UI/UX Design",
            "Business Development"
        ],
        [
            "Project Management",
            "iOS Development",
            "Android Development",
            "UI/UX Design",
            "Backend Development"
        ],
        [
            "Project Management",
            "iOS Development",
            "UI/UX Design",
            "Business Development",
            "Quality Assurance (QA)",
            "Backend Development"
        ],
        [
            "Project Management",
            "iOS Development",
            "UI/UX Design"
        ],
        [
            "Project Management",
            "iOS Development",
            "UI/UX Design"
        ],
        [
            "Project Management",
            "iOS Development",
            "UI/UX Design"
        ]
    ]
}
const flatDeliverables = json.deliverables.flat()
const uniqueDeliverables = [...new Set(flatDeliverables)]
const countDeliverables = uniqueDeliverables.map(deliverable => {
  var count = 0
  flatDeliverables.forEach(n => {
    if (n == deliverable) {
      count += 1
    }
  })
  return [deliverable, count]
})
const sortedDeliverables = countDeliverables.sort((a, b) => {
    return b[1] - a[1];
})

console.log(
  sortedDeliverables
)