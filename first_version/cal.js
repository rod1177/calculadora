const calculadora = {
  display: document.getElementById("displayBox"),
  operando1: null,
  operacion: null,
  nuevoNumero: false,

  escribe(valor) {
    const display = this.display;

    // Limpia "Error" o "0"
    if (display.value === "Error" || display.value === "0") {
      display.value = "";
    }

    // Si es un nuevo número, reemplaza el contenido
    if (this.nuevoNumero) {
      display.value = valor;
      this.nuevoNumero = false;
      return;
    }

    // Inserta donde está el cursor
    const start = display.selectionStart;
    const end = display.selectionEnd;
    const texto = display.value;

    display.value = texto.slice(0, start) + valor + texto.slice(end);

    // Mueve el cursor después del valor insertado
    const nuevaPos = start + valor.length;
    display.setSelectionRange(nuevaPos, nuevaPos);
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
      const start = this.display.selectionStart;
      const end = this.display.selectionEnd;

      if (start === end) {
        // Borra un carácter antes del cursor
        this.display.value =
          this.display.value.slice(0, start - 1) +
          this.display.value.slice(start);
        this.display.setSelectionRange(start - 1, start - 1);
      } else {
        // Borra el texto seleccionado
        this.display.value =
          this.display.value.slice(0, start) +
          this.display.value.slice(end);
        this.display.setSelectionRange(start, start);
      }
    }
  },

  cal_Porcentaje() {
    const valor = this.display.value;
    if (valor.includes("%")) return;
    this.display.value += "%";
  },

  inversor() {
    try {
      let expresion = this.display.value
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/--/g, "+");

      const valor = math.evaluate(expresion);
      if (valor !== 0 && isFinite(valor)) {
        this.display.value = 1 / valor;
      } else {
        this.display.value = "Error";
      }
    } catch {
      this.display.value = "Error";
    }
  },

  elevacion_Cuadrado() {
    try {
      let expresion = this.display.value
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/--/g, "+");

      const valor = math.evaluate(expresion);
      if (!isNaN(valor)) {
        this.display.value = valor ** 2;
      } else {
        this.display.value = "Error";
      }
    } catch {
      this.display.value = "Error";
    }
  },

  obtener_Raiz() {
    try {
      let expresion = this.display.value
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/--/g, "+");

      const valor = math.evaluate(expresion);
      if (valor >= 0 && isFinite(valor)) {
        this.display.value = Math.sqrt(valor);
      } else {
        this.display.value = "Error";
      }
    } catch {
      this.display.value = "Error";
    }
  },

  invertir_signo() {
    try {
      let expresion = this.display.value
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/--/g, "+");

      const valor = math.evaluate(expresion);
      if (!isNaN(valor)) {
        this.display.value = -valor;
      } else {
        this.display.value = "Error";
      }
    } catch {
      this.display.value = "Error";
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
    const valor = this.display.value;

    // Permitir signo negativo después de otro operador
    if (/[x+\-÷*/]$/.test(valor) && operador === "-") {
      this.display.value += operador;
      return;
    }

    // Evitar duplicar operadores seguidos
    if (/[x+\-÷*/]$/.test(valor)) {
      this.display.value = valor.slice(0, -1) + operador;
    } else {
      this.display.value += operador;
    }
  },

  resultado() {
    try {
      let expresion = this.display.value
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/--/g, "+");

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
  },
};
