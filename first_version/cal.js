const calculadora = {
  display: document.getElementById("displayBox"),
  operando1: null,
  operacion: null,
  nuevoNumero: false,

  escribe(valor) {
    if (this.display.value === "Error") {
      this.display.value = "";
    }

    if (this.nuevoNumero) {
      this.display.value = valor;
      this.nuevoNumero = false;
    } else {
      this.display.value += valor;
    }
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
    const valor = parseFloat(this.display.value);
    if (!isNaN(valor) && valor !== 0) {
      this.display.value = 1 / valor;
    } else {
      this.display.value = "Error";
    }
  },

  elevacion_Cuadrado() {
    const valor = parseFloat(this.display.value);
    if (!isNaN(valor)) {
      this.display.value = valor ** 2;
    } else {
      this.display.value = "Error";
    }
  },

  obtener_Raiz() {
    const valor = parseFloat(this.display.value);
    if (!isNaN(valor) && valor >= 0) {
      this.display.value = Math.sqrt(valor);
    } else {
      this.display.value = "Error";
    }
  },

  invertir_signo() {
    const valor = parseFloat(this.display.value);
    if (!isNaN(valor)) {
      this.display.value = -valor;
    }
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
  },

  resultado() {
   try {
    let expresion = this.display.value
      .replace(/x/g, "*")
      .replace(/÷/g, "/")
      .replace(/(\d+(?:\.\d+)?)%(\d+(?:\.\d+)?)/g, "($1/100)*$2");
      
    console.log("Expresión evaluada:", expresion);

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
