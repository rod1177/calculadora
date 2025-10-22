const calculadora = {
  display: document.getElementById("displayBox"),
  operando1: null,
  operacion: null,
  nuevoNumero: false,

init() {
  const display = this.display;

   display.addEventListener("beforeinput", (e) => {
    const data = e.data;
    const valor = display.value;
    const ultimo = valor.slice(-1);

     const especiales = ["deleteContentBackward", "deleteContentForward"];
    if (!data && !especiales.includes(e.inputType)) return;

     if (e.inputType === "insertLineBreak") {
      e.preventDefault();
      this.resultado();
      return;
    }

     const permitido = /[0-9+\-x÷*/.%]/.test(data);
    if (!permitido && !especiales.includes(e.inputType)) {
      e.preventDefault();
      return;
    }

     if (/[+\-x÷*/]/.test(data) && /[+\-x÷*/]/.test(ultimo)) {
      e.preventDefault();  
      display.value = valor.slice(0, -1) + data;
       display.setSelectionRange(display.value.length, display.value.length);
      display.scrollLeft = display.scrollWidth;
      return;
    }
  });

  display.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.resultado();
    }
  });
},


  escribe(valor) {
    const display = this.display;
    let start = display.selectionStart;
    let end = display.selectionEnd;
    let texto = display.value;

    if (texto === "Error" || texto === "0") {
      texto = "";
      start = end = 0;
    }

    if (this.nuevoNumero && /\d/.test(valor)) {
      texto = "";
      start = end = 0;
      this.nuevoNumero = false;
    }

    const nuevoTexto = texto.slice(0, start) + valor + texto.slice(end);
    const nuevaPos = start + valor.length;

    const scrollPrev = display.scrollLeft;
    display.value = nuevoTexto;
    display.setSelectionRange(nuevaPos, nuevaPos);
    display.scrollLeft = scrollPrev > 0 ? scrollPrev : display.scrollWidth;
    display.focus();
  },

  borrar_Pantalla() {
    this.display.value = "";
    this.operando1 = null;
    this.operacion = null;
    this.nuevoNumero = false;
  },

  borrar_Numero() {
    const display = this.display;
    let start = display.selectionStart;
    let end = display.selectionEnd;
    let texto = display.value;

    if (texto === "Error") {
      this.borrar_Pantalla();
      return;
    }

    if (start !== end) {
      display.value = texto.slice(0, start) + texto.slice(end);
      display.setSelectionRange(start, start);
    } else if (start > 0) {
      display.value = texto.slice(0, start - 1) + texto.slice(end);
      display.setSelectionRange(start - 1, start - 1);
    }

    display.focus();
  },

  cal_Porcentaje() {
    const valor = this.display.value;
    if (!valor.endsWith("%")) {
      this.display.value += "%";
      this.display.focus();
    }
  },

  inversor() {
    const match = this.display.value.match(/(-?\d+\.?\d*)$/);
    if (!match) return;
    const num = parseFloat(match[1]);
    if (num === 0) return (this.display.value = "Error");
    const resultado = 1 / num;
    this.display.value = this.display.value.replace(/(-?\d+\.?\d*)$/, resultado);
  },

  elevacion_Cuadrado() {
    const match = this.display.value.match(/(-?\d+\.?\d*)$/);
    if (!match) return;
    const num = parseFloat(match[1]);
    const resultado = num ** 2;
    this.display.value = this.display.value.replace(/(-?\d+\.?\d*)$/, resultado);
  },

  obtener_Raiz() {
    const match = this.display.value.match(/(-?\d+\.?\d*)$/);
    if (!match) return;
    const num = parseFloat(match[1]);
    if (num < 0) return (this.display.value = "Error");
    const resultado = Math.sqrt(num);
    this.display.value = this.display.value.replace(/(-?\d+\.?\d*)$/, resultado);
  },

  invertir_signo() {
    const match = this.display.value.match(/(-?\d+\.?\d*)$/);
    if (!match) return;
    const num = parseFloat(match[1]);
    const resultado = -num;
    this.display.value = this.display.value.replace(/(-?\d+\.?\d*)$/, resultado);
  },

  suma() { this.verificarError(); this.agregarOperacion("+"); },
  restar() { this.verificarError(); this.agregarOperacion("-"); },
  multiplicacion() { this.verificarError(); this.agregarOperacion("x"); },
  division() { this.verificarError(); this.agregarOperacion("÷"); },

  verificarError() {
    if (this.display.value === "Error") this.borrar_Pantalla();
  },

  agregarOperacion(operador) {
    const display = this.display;
    let start = display.selectionStart;
    let end = display.selectionEnd;
    let texto = display.value;

    if (/[+\-x*\/÷%]$/.test(texto)) {
      texto = texto.slice(0, -1) + operador;
      display.value = texto;
    } else {
      const nuevoTexto = texto.slice(0, start) + operador + texto.slice(end);
      display.value = nuevoTexto;
    }

    const nuevaPos = display.value.length;
    display.setSelectionRange(nuevaPos, nuevaPos);
    display.scrollLeft = display.scrollWidth;
    display.focus();
    this.nuevoNumero = false;
  },

  resultado() {
    try {
      let expresion = this.display.value
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/(\d+\.?\d*)%/g, "($1/100)");

      const res = math.evaluate(expresion);

      if (!isFinite(res) || isNaN(res)) {
        this.display.value = "Error";
      } else {
        this.display.value = res;
        this.display.setSelectionRange(this.display.value.length, this.display.value.length);
      }

      this.nuevoNumero = true;
      this.display.scrollLeft = this.display.scrollWidth;
      this.display.focus();
    } catch {
      this.display.value = "Error";
    }
  }
};

calculadora.init();
