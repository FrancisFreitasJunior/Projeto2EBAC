const form = document.getElementById('form-restaurante');
const nomeClientes = [];
const telefonesClientes = [];
const datasAgendamentos = [];
const horariosAgendamentos = [];

let linhas = '';


form.addEventListener('submit', function (e) {
    e.preventDefault();

    adicionaCliente();
    atualizaTabela();
});


function adicionaCliente() {
    const inputNomeCliente = document.getElementById('nome-cliente');
    const inputTelefoneCliente = document.getElementById('telefone-cliente');
    const inputDataAgendamento = document.getElementById('data-agendamento');
    const inputHorarioAgendamento = document.getElementById('horario-agendamento');

    const [ano, mes, dia] = inputDataAgendamento.value.split('-');
    const dataAgendamento = new Date(ano, mes - 1, dia);

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataAgendamento < hoje) {
        alert("Não é possível agendar para uma data anterior à de hoje.");
        return;
    }

    const dataBR = dataAgendamento.toLocaleDateString('pt-BR');

    nomeClientes.push(inputNomeCliente.value);
    telefonesClientes.push(inputTelefoneCliente.value);
    datasAgendamentos.push(inputDataAgendamento.value);
    horariosAgendamentos.push(inputHorarioAgendamento.value);

    let linha = '<tr>';
    linha += `<td>${inputNomeCliente.value}</td>`;
    linha += `<td>${inputTelefoneCliente.value}</td>`;
    linha += `<td>${dataBR}</td>`;
    linha += `<td>${inputHorarioAgendamento.value}</td>`;
    linha += `<td><button class="button-tabela"><span class="material-symbols-outlined">delete</span></button></td>`;
    linha += '</tr>';

    linhas += linha;

    inputNomeCliente.value = '';
    inputTelefoneCliente.value = '';
    inputDataAgendamento.value = '';
    inputHorarioAgendamento.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}


document.querySelector('tbody').addEventListener('click', function (event) {
    if (event.target.closest('.button-tabela')) {
        const linha = event.target.closest('tr');
        const nome = linha.querySelector('td').textContent;

        linha.remove();

        const index = nomeClientes.indexOf(nome);
        if (index !== -1) {
            nomeClientes.splice(index, 1);
            telefonesClientes.splice(index, 1);
            datasAgendamentos.splice(index, 1);
            horariosAgendamentos.splice(index, 1);
        }

        linhas = document.querySelector('tbody').innerHTML;
    }
});