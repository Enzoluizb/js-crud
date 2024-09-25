document.addEventListener("DOMContentLoaded", () => {
  const crudForm = document.getElementById("crudForm");
  const nameInput = document.getElementById("petName");
  const speciesInput = document.getElementById("species");
  const ageInput = document.getElementById("age");
  const editIndexInput = document.getElementById("editIndex");
  const crudTableBody = document.getElementById("crudTableBody");
  const editMessage = document.getElementById("editMessage");

  // Função para renderizar a lista de pets
  function renderTable() {
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    crudTableBody.innerHTML = "";

    pets.forEach((pet, index) => {
      crudTableBody.innerHTML += `
        <tr>
          <td>${pet.name}</td>
          <td>${pet.species}</td>
          <td>${pet.age}</td>
          <td class="actions">
            <button class="edit" onclick="editPet(${index})">Editar</button>
            <button class="delete" onclick="deletePet(${index})">Deletar</button>
          </td>
        </tr>
      `;
    });
  }

  // Função para salvar ou atualizar um pet
  crudForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const species = speciesInput.value.trim();
    const age = ageInput.value.trim();
    const editIndex = parseInt(editIndexInput.value, 10);
    let pets = JSON.parse(localStorage.getItem("pets")) || [];

    if (editIndex === -1) {
      // Criar um novo pet
      pets.push({ name, species, age: `${age} ano(s)` });
    } else {
      // Editar um pet existente
      pets[editIndex] = { name, species, age: `${age} anos` };
      editMessage.style.display = "none"; // Ocultar aviso de edição
    }

    localStorage.setItem("pets", JSON.stringify(pets));
    renderTable();
    crudForm.reset();
    editIndexInput.value = -1;
  });

  // Função para editar um pet
  window.editPet = function (index) {
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    nameInput.value = pets[index].name;
    speciesInput.value = pets[index].species;
    ageInput.value = pets[index].age.replace(" anos", ""); // Remove o sufixo 'anos' ao editar
    editIndexInput.value = index;
    editMessage.style.display = "block"; // Exibir aviso de edição
  };

  // Função para deletar um pet
  window.deletePet = function (index) {
    let pets = JSON.parse(localStorage.getItem("pets")) || [];
    pets.splice(index, 1);
    localStorage.setItem("pets", JSON.stringify(pets));
    renderTable();
  };

  // Carregar a tabela na inicialização
  renderTable();
});
