const addUrl = "http://localhost:34568/api/admin/add";
const dbRoles = [{id: 1, name: "ROLE_ADMIN"}, {id: 2, name: "ROLE_USER"}];

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
    await fetch('http://localhost:34568/api/admin/add', method).then(() => {
        newUserForm.reset();
        $('[href="#usersTable"]').tab('show');

    });

}