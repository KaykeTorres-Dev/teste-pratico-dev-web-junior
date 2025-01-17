fetch("http://127.0.0.1:8000/api/get-users", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error("Erro ao carregar lista de usuários!");
  }
  return response.json();
})
.then(serverData => {
  const usersData = serverData.users;
  const tableBody = document.querySelector("table tbody");

  usersData.forEach(user => {
    const tableRow = createTableRow(user);
    tableBody.appendChild(tableRow);
  });
})
.catch(error => {
  const errorMessage = errorMessageFormatted(error);
  toast(errorMessage, "danger");
  console.error("Erro ao carregar lista de usuários:", error);
});

function createTableRow(user) {
  const tableRow = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = user.name;
  tableRow.appendChild(nameCell);

  const emailCell = document.createElement("td");
  emailCell.textContent = user.email;
  tableRow.appendChild(emailCell);

  const actionsCell = createActionButtons(user);
  tableRow.appendChild(actionsCell);

  return tableRow;
}

function createActionButtons(userData) {
  const actionsCell = document.createElement("td");

  const editButton = document.createElement("button");
  editButton.classList.add("btn", "btn-outline-primary");
  editButton.innerHTML = '<i class="bi bi-pencil-fill"></i>';

  const userId = userData.id;

  editButton.addEventListener("click", () => {
    const editUserModal = new bootstrap.Modal(document.getElementById("editUserModal"));
    editUserModal.show();
    
    const editModalButton = document.getElementById("editUserButton");
    editModalButton.addEventListener("click", () => {
      goToeditUserPage(userId);
      editUserModal.hide();
    });
  });

  
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-outline-danger", "delete-user-button");
  deleteButton.innerHTML = '<i class="bi bi-person-x"></i>';

  deleteButton.addEventListener("click", () => {
    const deleteUserModal = new bootstrap.Modal(document.getElementById("deleteUserModal"));
    deleteUserModal.show();

    const deleteModalButton = document.getElementById("deleteUserButton");
    deleteModalButton.addEventListener("click", () => {
      deleteUser(userId);
      deleteUserModal.hide();
    });
  });

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);

  return actionsCell;
}

function goToeditUserPage(userId) {
  const editUserUrl = "http://127.0.0.1:5500/components/edicao-de-usuarios/edicao-de-usuarios.html?id=" + userId;
  window.location.href = editUserUrl;
}
  
  
function deleteUser(userId) {
  fetch(`http://127.0.0.1:8000/api/delete-user/${userId}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(userId)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao excluir o usuário. Por favor, tente novamente.");
    }
    return response.json();
  })
  .then(data => {
    location.reload();
    toast("Usuário excluído com sucesso!", "success");
      
  })
  .catch(error => {
    const errorMessage = errorMessageFormatted(error);
    toast(errorMessage, "danger");
    console.error("Erro ao excluir usuário:", error);
  });
}
