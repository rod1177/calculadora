const calculadora = {
  display: document.getElementById("displayBox"),
  operando1: null,
  operacion: null,
  nuevoNumero: false,

  escribe(valor) {
    if (this.display.value === "Error" || this.display.value === "0") {
      this.display.value = "";
    }

    if (this.nuevoNumero && /[+\-x÷*/]/.test(this.display.value.slice(-1)) === false) {
      this.display.value = valor;
      this.nuevoNumero = false;
    } else {
      this.display.value += valor;
    }

    this.display.scrollLeft = this.display.scrollWidth;

  },

  borrar_Pantalla() {
    this.display.value = "";
    this.operando1 = null;
    this.operacion = null;
    this.nuevoNumero = false;
  },

  borrar_Numero() {
    if (this.display.value === "Error") {
      this.borrar_Pantalla();
    } else {
      this.display.value = this.display.value.slice(0, -1);
    }
  },

  cal_Porcentaje() {
    const valor = this.display.value;
    if (valor.includes("%")) return;
    this.display.value += "%";
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
    if (/[+\-x*\/÷]$/.test(this.display.value)) {
      this.display.value = this.display.value.slice(0, -1) + operador;
    } else {
      this.display.value += operador;
    }
    this.nuevoNumero = false;
  },

  resultado() {
    try {
      let expresion = this.display.value
        .replace(/x/g, "*")
        .replace(/÷/g, "/");
      const res = math.evaluate(expresion);
      if (!isFinite(res) || isNaN(res)) {
        this.display.value = "Error";
      } else {
        this.display.value = res;
      }
      this.nuevoNumero = true;
    } catch {
      this.display.value = "Error";
    }
  }
};
