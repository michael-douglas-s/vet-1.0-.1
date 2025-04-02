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

  // Animações com o avatar

  document.addEventListener("DOMContentLoaded", function() {
    const image1 = document.getElementById("image-1");
    const image2 = document.getElementById("image-2");
    const image3 = document.getElementById("image-3");
  
    let currentImage = 1; // Controla qual imagem está visível
  
    function switchImages() {
      if (currentImage === 1) {
        // Mostrar a imagem 2 e esconder a imagem 1
        image1.style.opacity = 0;
        image2.style.opacity = 1;
        currentImage = 2;
      } else if (currentImage === 2) {
        // Mostrar a imagem 3 e esconder a imagem 2
        image2.style.opacity = 0;
        image3.style.opacity = 1;
        currentImage = 3;
      } else {
        // Mostrar a imagem 1 e esconder a imagem 3
        image3.style.opacity = 0;
        image1.style.opacity = 1;
        currentImage = 1;
      }
    }
  
    // Troca de imagens a cada 3 segundos (3000 milissegundos)
    setInterval(switchImages, 4000);
  
    // Inicializa a primeira imagem como visível
    image1.style.opacity = 1;
  });
  