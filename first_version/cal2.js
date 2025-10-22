const calculadora = {
  display: document.getElementById("displayBox"),
  operando1: null,
  operacion: null,
  nuevoNumero: false,

  escribe(valor) {
    const display = this.display;
    let start = display.selectionStart;
    let end = display.selectionEnd;
    let texto = display.value;

    if (texto === "Error" || texto === "0") {
      texto = "";
      start = end = 0;
    }

    if (this.nuevoNumero && /[+\-x÷*/]/.test(texto.slice(-1)) === false) {
      texto = "";
      start = end = 0;
      this.nuevoNumero = false;
    }

    const nuevoTexto = texto.slice(0, start) + valor + texto.slice(end);
    display.value = nuevoTexto;

    const nuevaPos = start + valor.length;
    display.setSelectionRange(nuevaPos, nuevaPos);
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
    } else if (start > "") {
      display.value = texto.slice(0, start - 1) + texto.slice(end);
      display.setSelectionRange(start - 1, start - 1);
    }

    display.focus();
  },

  cal_Porcentaje() {
    const valor = this.display.value;
    if (valor.includes("%")) return;
    this.display.value += "%";
    this.display.focus();
  },

  inversor() {
    const match = this.display.value.match(/(-?\d+\.?\d*)$/);
    if (!match) return;
    const num = parseFloat(match[1]);
    if (num === 0) {
      this.display.value = "Error";
      return;
    }
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
    if (num < 0) {
      this.display.value = "Error";
      return;
    }
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

  suma() {
    this.verificarError();
    this.agregarOperacion("+");
  },

  restar() {
    this.verificarError();
    this.agregarOperacion("-");
  },

  multiplicacion() {
    this.verificarError();
    this.agregarOperacion("x");
  },

  division() {
    this.verificarError();
    this.agregarOperacion("÷");
  },

  verificarError() {
    if (this.display.value === "Error") {
      this.borrar_Pantalla();
    }
  },

  agregarOperacion(operador) {
    const display = this.display;
    let start = display.selectionStart;
    let end = display.selectionEnd;
    let texto = display.value;

    if (/[+\-x*\/÷]$/.test(texto)) {
      texto = texto.slice(0, -1) + operador;
      display.value = texto;
      display.setSelectionRange(texto.length, texto.length);
    } else {
      const nuevoTexto = texto.slice(0, start) + operador + texto.slice(end);
      display.value = nuevoTexto;
      const nuevaPos = start + operador.length;
      display.setSelectionRange(nuevaPos, nuevaPos);
    }

    display.focus();
    this.nuevoNumero = false;
  },

  resultado() {
    try {
      let expresion = this.display.value
        .replace(/x/g, "*")
        .replace(/÷/g, "/");

      const porcentaje = /(\d+\.?\d*)%(\d+\.?\d*)/;
      while (porcentaje.test(expresion)) {
        expresion = expresion.replace(
          porcentaje,
          (_, a, b) => `(${a}/100)*(${b})`
        );
      }

      const res = math.evaluate(expresion);

      if (!isFinite(res) || isNaN(res)) {
        this.display.value = "Error";
      } else {
        this.display.value = res;
        this.display.setSelectionRange(
          this.display.value.length,
          this.display.value.length
        );
      }

      this.nuevoNumero = true;
      this.display.focus();
    } catch {
      this.display.value = "Error";
    }
  }
};
