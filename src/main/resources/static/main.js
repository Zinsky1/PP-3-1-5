const url = "http://localhost:34568/api/admin/"
const dbRoles = [{id: 1, name: "ROLE_ADMIN"}, {id: 2, name: "ROLE_USER"}]



fetch('/user')
    .then(response => response.json())
    .catch(error => console.log(error))

let usersInfo = ''
const showUsers = (users) => {
    const container = document.getElementById("tbody-admin")
    const arr = Array.from(users)
    arr.forEach(user => {
        usersInfo += `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>${user.roles.map(role => role.name)}</td>
            <td class="text text-white">
                <a class="btnEdit btn btn-info">Edit</a>
            </td>
            <td class="text text-white">
                <a class="btnDelete btn btn-danger">Delete</a>
            </td>
        </tr>
        `
    })
    container.innerHTML = usersInfo
}
fetch(url)
    .then(response => response.json())
    .then(data => {
        showUsers(data)

    })
    .catch(error => console.log(error))

const reloadShowUsers = () => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            usersInfo = '';
            console.log(data);
            showUsers(data);
        })
}

let userInfo = ''
const showUser = (user) => {
    const container = document.getElementById("tbody-user-info")
    userInfo += `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>${user.roles.map(role => role.name)}</td>
        </tr>`
    container.innerHTML = userInfo
}
fetch('/user')
    .then(response => response.json())
    .then(data => {
            showUser(data)
            detailsUser(data)
        }
    )
    .catch(error => console.log(error))


 //Create user
const newUserForm = document.getElementById('formNewUser');
const newRoles = document.getElementById('roles');

newRoles.innerHTML = `
                   <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
                    <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
                   `

newUserForm.addEventListener('submit', addNewUser);

async function addNewUser(event) {
    event.preventDefault();

    const newRole = document.querySelector('#roles').selectedOptions;
    let listOfRole = [];
    for (let i = 0; i < newRole.length; i++) {
        listOfRole.push({
            id: newRole[i].value
        });
    }

    let method = {
        method: 'POST',
        url: 'http://localhost:34568/api/admin/add',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            firstname: newUserForm.firstname.value,
            lastname: newUserForm.lastname.value,
            email: newUserForm.email.value, //mb username
            age: newUserForm.age.value,
            password: newUserForm.password.value,
            roles: listOfRole
        })
    }
    //await fetch(url, method).then(() => {
    await fetch('http://localhost:34568/api/admin/add', method).then(() => {
        newUserForm.reset();
        $('[href="#nav-admin"]').tab('show');

    }).then(reloadShowUsers);

}


 // Edit modal
const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const editForm = document.getElementById('editForm')
const idEdit = document.getElementById('idEdit')
const firstnameEdit = document.getElementById('firstnameEdit')
const lastnameEdit = document.getElementById('lastnameEdit')
const emailEdit = document.getElementById('emailEdit')
const ageEdit = document.getElementById('ageEdit')
const passwordEdit = document.getElementById('passwordEdit')
const rolesEdit = document.getElementById('userRoleEdit')

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            console.log("btnEditClick")
            handler(e)
        }
    })
}


let idForm = 0
on(document, 'click', '.btnEdit', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch(url + idForm, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => getUserById(data))
        .catch(error => console.log(error))
    const getUserById = (user) => {
        idEdit.value = user.id
        firstnameEdit.value = user.firstname
        lastnameEdit.value = user.lastname
        emailEdit.value = user.email
        ageEdit.value = user.age
        passwordEdit.value = ''
        rolesEdit.innerHTML = `
            <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
            <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
            `
        Array.from(rolesEdit.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalEdit.show()
    }
})

const editUrl = "http://localhost:34568/api/admin/edit";
editForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let listRoles = roleArray(document.getElementById('userRoleEdit'))
    //fetch(url, {
    fetch(editUrl, {
        cache: "no-store",
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: idForm,
            firstname: firstnameEdit.value,
            lastname: lastnameEdit.value,
            email: emailEdit.value,
            age: ageEdit.value,
            password: passwordEdit.value,
            roles: listRoles
        })
    })
        .then(res => res.json())
        .then(data => {
            showUsers(data)

        } )
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalEdit.hide()
})

//Delete modal
const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
const deleteForm = document.getElementById('modalDelete')
const idDelete = document.getElementById('idDel')
const firstnameDelete = document.getElementById('firstnameDel')
const lastnameDelete = document.getElementById('lastnameDel')
const emailDelete = document.getElementById('emailDel')
const ageDelete = document.getElementById('ageDel')
const rolesDelete = document.getElementById('userRoleDel')

on(document, 'click', '.btnDelete', e => {
    const row = e.target.parentNode.parentNode
    idForm = row.firstElementChild.innerHTML
    fetch(url + idForm, {
        method: 'GET'
    }).then(response => response.json()).then(data => getUserById(data)).catch(error => console.log(error))
    const getUserById = (user) => {
        idDelete.value = user.id
        firstnameDelete.value = user.firstname
        lastnameDelete.value = user.lastname
        emailDelete.value = user.email
        ageDelete.value = user.age
        rolesDelete.innerHTML = `
            <option value="${dbRoles[0].id}">${dbRoles[0].name}</option>
            <option value="${dbRoles[1].id}">${dbRoles[1].name}</option>
            `
        Array.from(rolesDelete.options).forEach(opt => {
            user.roles.forEach(role => {
                if (role.name === opt.text) {
                    opt.selected = true
                }
            })
        })
        modalDelete.show();
    }

})

const deleteUrl = "http://localhost:34568/api/admin/{id}/delete";
deleteForm.addEventListener('submit',   (e) => {
    e.preventDefault()
    //fetch(url + idForm, {
    fetch(url + idForm + "/delete", {
        method: 'DELETE'
    })
        .then(data => showUsers(data))
        .catch(error => console.log(error))
        .then(reloadShowUsers)
    modalDelete.hide()
})

let roleArray = (options) => {
    let array = []
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            let role = {id: options[i].value}
            array.push(role)
        }
    }
    return array
}

let userNavbar = '';
const detailsUser = (user) => {
    const containerNavbar = document.getElementById("navbar-admin");
    userNavbar += `
         <span class="navbar-brand mb-0 h1" style="color:white; margin-right: 20px">${user.username}</span>
         <span class="navbar-brand mb-0 h1" style="color:white">${user.roles.map(role => role.name)}</span>
         <a href="/logout">
         <button type="button" class="btn btn-primary mr float-right" style="margin-left: 800px">
         Logout
         </button>
         </a>                                    

    `
    containerNavbar.innerHTML = userNavbar
}