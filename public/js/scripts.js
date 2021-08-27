document.addEventListener('DOMContentLoaded', e => {
    // 1. Profile image
    const profileImg = document.querySelector('#profileImg')
    profileImg.addEventListener('change', async e => {
        const formData = new FormData()
        formData.append('profileImg', profileImg.files[0])
        let response = await fetch('/admin/profileImg', {
            method: 'POST',
            body: formData
        })
        response = await response.json()
        console.log(response)
    })

    // add skills
    let skillsForm = document.querySelector('.skills-form'),
        skillsRow = document.querySelector('.skills-row'),
        skillsCols = skillsRow.querySelectorAll('.col-4'),
        addSkillBtn = document.querySelector('.add-new-skill')

    addSkillBtn.addEventListener('click', e => {
        let col4 = document.createElement('div')
        col4.classList.add('col-4', 'd-flex')
        col4.innerHTML = `
            <input class="form-control w-25" data-skill-order type="number" required>
            <input class="form-control w-25" data-skill-degree type="number" required min="0" max="100">
            <input class="form-control" data-skill-name type="text" required minlength="2">
        `
        skillsRow.append(col4)
    })

    skillsForm.addEventListener('submit', async e => {
        e.preventDefault()

        let skills = []

        skillsCols = skillsRow.querySelectorAll('.col-4')
        skillsCols.forEach(skillCol => {
            const order = skillCol.querySelector('[data-skill-order]').value,
                degree = skillCol.querySelector('[data-skill-degree]').value,
                name = skillCol.querySelector('[data-skill-name]').value
            skills.push({
                skill_order: order,
                skill_name: name,
                skill_degree: degree
            })
        })

        let response = await fetch('/admin/edit-skills', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(skills)
        })
        response = await response.json()
        if (response.ok) {
            window.location.reload()
        }
    })

    const newProjectForm = document.querySelector('#new-project'),
        projectPoster = newProjectForm.querySelector('[name="project_poster"]'),
        projectName = newProjectForm.querySelector('[name="project_name"]'),
        projectType = newProjectForm.querySelector('[name="project_type"]'),
        projectLink = newProjectForm.querySelector('[name="project_link"]')
    newProjectForm.addEventListener('submit', async e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('project_poster', projectPoster.files[0])
        formData.append('project_title', projectName.value)
        formData.append('project_type', projectType.value)
        formData.append('project_link', projectLink.value)

        let response = await fetch('/admin/new-project', {
            method: 'POST',
            body: formData
        })

        response = await response.json()
        if (response.ok) {
            window.location.reload()
        }
    })
})