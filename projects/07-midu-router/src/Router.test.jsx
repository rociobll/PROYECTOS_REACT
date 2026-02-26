import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Router } from "./Router";
import { getCurrentPath } from "./utils";
import { Route } from "./Route";
import { Link } from "./Link";

// para mockear
vi.mock("./utils.js", () => ({  // cada vez que se importe algo de utils no uses archivo real usa el objetoq ue te doy
  getCurrentPath: vi.fn(), // fn función vacía que permite decirle que valores tiene que devolver
}));

describe("Router", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks() //limpar mocks cada vez q se ejecute un test
  });
  it("should it should render without problems", () => {
    render(<Router routes={[]} />); //renderizar las rutas en vacío para detectar si nuestro componenete no renderiza de ninguna forma
    expect(true).toBeTruthy()
  });

  it("should render 404 if no routes match", () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText("404")).toBeTruthy()
  });

  it("should render the component of the first route that matches", () => {
    getCurrentPath.mockReturnValueOnce("/about") //cuando se ejcute getCurrentValue, nos va devolver este valor, en este caso /about
    const routes = [
      {
        path: "/",
        Component: () => <h1>Home</h1>,
      },
      {
        path: "/about",
        Component: () => <h1>About</h1>,
      },
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText("About")).toBeTruthy()  // el expecconfirma si el texto about aparece en la pantalla
  })

  it('should navigate using Links', async () => {
    getCurrentPath.mockReturnValueOnce('/')

    render (
        <Router>
            <Route path="/" Component= {() => {
                return (
                    <>
                    <h1>Home</h1>
                    <Link to= '/about'>Go To About</Link>
                    </>
                )
            }}
            />
            <Route path='/about' Component={()=> <h1>About</h1>} />
            
        </Router>
    )
    //Click on the link
    const anchor = screen.getByText(/Go To About/)
    fireEvent.click(anchor)

    const aboutTitle = await screen.findByText('About')

    //check the the new rote is rendered
    expect(aboutTitle).toBeTruthy()
  })
})
