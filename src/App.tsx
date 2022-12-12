import { Copy } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import "./App.scss";

type PassowordOptions = {
  especial: boolean;
  numeros: boolean;
  maiusculas: boolean;
  minusculas: boolean;
};

function App() {
  const [tamanhoSenha, setTamanhoSenha] = useState<number>(25),
    [options, setOptions] = useState<PassowordOptions>({
      especial: false,
      numeros: false,
      maiusculas: false,
      minusculas: false,
    }),
    [senhasGeradas, setSenhasGeradas] = useState<string[]>([]);

  const { senhas } = useGeneratePasswords();

  const updateOptions = (e: ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <div className={"mainContainer"}>
        <label htmlFor="tamanho">Tamanho da senha: {tamanhoSenha}</label>
        <input
          type="range"
          min={5}
          max={25}
          name="tamanho"
          onChange={(e) => setTamanhoSenha(Number(e.target.value))}
        />
        <div>
          <label htmlFor="especial">Caracter Especial</label>
          <input type="checkbox" name="especial" onChange={updateOptions} />
        </div>

        <div>
          <label htmlFor="numeros">Números</label>
          <input type="checkbox" name="numeros" onChange={updateOptions} />
        </div>

        <div>
          <label htmlFor="maiusculas">Maiúsculas</label>
          <input type="checkbox" name="maiusculas" onChange={updateOptions} />
        </div>

        <div>
          <label htmlFor="minusculas">Minúsculas</label>
          <input type="checkbox" name="minusculas" onChange={updateOptions} />
        </div>

        <button onClick={() => setSenhasGeradas(senhas(options, tamanhoSenha))}>
          Gerar senha
        </button>

        {senhasGeradas.length > 0 ? (
          <table>
            {senhasGeradas.map((senha, index) => (
              <tr key={index}>
                <td>{senha}</td>
                <td>
                  <a
                    onClick={() => {
                      navigator.clipboard.writeText(senha);
                      alert("Senha copiada!");
                    }}
                  >
                    <Copy size={16} />
                  </a>
                </td>
              </tr>
            ))}
          </table>
        ) : null}
      </div>
    </main>
  );
}

function useGeneratePasswords() {
  const NUMEROS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const MINUSCULAS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const MAIUSCULAS = MINUSCULAS.map((letra) => letra.toUpperCase());
  const ESPECIAL = [
    "+",
    "-",
    "&",
    "|",
    "!",
    "(",
    ")",
    "{",
    "}",
    "[",
    "]",
    "^",
    "~",
    "*",
    "?",
    ":",
  ];

  const senhas = (options: PassowordOptions, size: Number): string[] => {
    let caracteres: string[] = [],
      senhasRetorno: string[] = [];

    if (options.especial) caracteres = caracteres.concat(ESPECIAL);
    if (options.numeros) caracteres = caracteres.concat(NUMEROS);
    if (options.maiusculas) caracteres = caracteres.concat(MAIUSCULAS);
    if (options.minusculas) caracteres = caracteres.concat(MINUSCULAS);

    senhasRetorno = [...new Array(10)].map(() =>
      [...new Array(size)]
        .map(() => caracteres[Math.floor(Math.random() * caracteres.length)])
        .join("")
    );

    return senhasRetorno;
  };

  return { senhas };
}

export default App;
