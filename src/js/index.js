document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("appointment-form");
    const dateInput = document.getElementById("appointment-date");
    const timeInput = document.getElementById("appointment-time");
    const serviceTypeInput = document.getElementById("service-type");
  
    // Recupera os agendamentos do localStorage
    let bookedAppointments = JSON.parse(localStorage.getItem("bookedAppointments")) || {};
  
    // Define os horários disponíveis (de 1 em 1 hora)
    const horariosDisponiveis = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
  
    // Atualiza os horários disponíveis quando a data muda
    dateInput.addEventListener("input", atualizarHorariosDisponiveis);
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const tutorName = document.getElementById("tutor-name").value;
      const animalName = document.getElementById("animal-name").value;
      const serviceType = serviceTypeInput.options[serviceTypeInput.selectedIndex].text; // Captura corretamente o serviço selecionado
      const appointmentDate = dateInput.value;
      const appointmentTime = timeInput.value;
  
      if (!appointmentDate || !appointmentTime || !serviceType) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      // Verifica se o horário já está reservado para essa data
      if (bookedAppointments[appointmentDate]?.includes(appointmentTime)) {
        alert("Este horário já está ocupado para essa data. Escolha outro horário.");
        return;
      }
  
      // Salva o novo agendamento no localStorage
      if (!bookedAppointments[appointmentDate]) {
        bookedAppointments[appointmentDate] = [];
      }
      bookedAppointments[appointmentDate].push(appointmentTime);
      localStorage.setItem("bookedAppointments", JSON.stringify(bookedAppointments));
  
      // Monta a mensagem para o WhatsApp
      const mensagem = `Olá, gostaria de marcar uma consulta!%0A%0A👤 Tutor: ${tutorName}%0A🐶 Animal: ${animalName}%0A📝 Serviço: ${serviceType}%0A📅 Data: ${appointmentDate}%0A⏰ Horário: ${appointmentTime}`;
  
      // Número do WhatsApp (substitua pelo número real)
      const telefone = "5531971270860"; // Formato internacional, sem "+"
  
      // Abre o WhatsApp permitindo que o usuário envie a mensagem
      window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
  
      // Atualiza a lista de horários disponíveis
      atualizarHorariosDisponiveis();
    });
  
    function atualizarHorariosDisponiveis() {
      const selectedDate = dateInput.value;
      const horariosOcupados = bookedAppointments[selectedDate] || [];
  
      // Limpa o campo de horários
      timeInput.innerHTML = "<option value=''>Selecione um horário</option>";
  
      // Adiciona apenas horários disponíveis (de 1 em 1 hora)
      horariosDisponiveis.forEach((horario) => {
        if (!horariosOcupados.includes(horario)) {
          const option = document.createElement("option");
          option.value = horario;
          option.textContent = horario;
          timeInput.appendChild(option);
        }
      });
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    const timeInput = document.getElementById("appointment-time");
  
    // Lista de horários disponíveis
    const horariosDisponiveis = ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "22:00"];
    // Lista de horários ocupados (exemplo)
    const horariosOcupados = ["14:00", "21:00"]; 
  
    // Função para atualizar os horários disponíveis
    function atualizarHorariosDisponiveis() {
      // Limpa o valor atual do input de horário
      timeInput.innerHTML = ""; // limpa as opções anteriores
  
      // Adiciona as opções de horário ao campo de input
      horariosDisponiveis.forEach((horario) => {
        // Cria um novo option para cada horário disponível
        const option = document.createElement("option");
        option.value = horario;
        option.textContent = horario;
        
        // Verifica se o horário está ocupado e adiciona a classe 'indisponivel'
        if (horariosOcupados.includes(horario)) {
          option.classList.add("indisponivel"); // Aplica a classe 'indisponivel'
          option.disabled = true; // Desabilita o horário
        }
  
        // Adiciona a opção ao campo de input
        timeInput.appendChild(option);
      });
    }
  
    // Chama a função para preencher as opções no início
    atualizarHorariosDisponiveis();
  });

  document.getElementById("appointment-time").addEventListener("change", function() {
    const appointmentTime = this.value;
  
    // Verificar se o horário já está ocupado
    checkIfTimeAvailable(appointmentTime);
  });
  
  function checkIfTimeAvailable(time) {
    // Enviar a verificação do horário para o servidor
    fetch('/check-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appointmentTime: time })
    })
    .then(response => response.json())
    .then(data => {
      if (data.available) {
        // Se o horário estiver disponível, permita a seleção
        selectTime(time);
      } else {
        // Caso contrário, mostre uma mensagem de erro
        alert('Este horário já foi ocupado!');
      }
    });
  }
  
  function selectTime(time) {
    // Enviar o horário selecionado para o servidor e bloquear para os outros usuários
    fetch('/select-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appointmentTime: time })
    });
  
    // Atualizar UI
    alert(`Horário ${time} reservado com sucesso!`);
  }
  