//Pages
import Home from "./pages/HomePage"
import Combos from "./pages/CombosPage"
import AlienListPage from "./pages/AlienListPage"
import IndividualAlienPage from "./pages/IndividualAlienPage"

import Aliens from './dataFiles/originalAliens.json'

const AlienBreadcrumb = ({ match }) => Aliens.aliens[match.params.alienIndex].name;

export const routes = [
    {
      path: "/",
      element: <Home />,
      breadcrumb: "Home",
    },
    {
      path: "/Combos",
      element: <Combos />,
    },
    {
      path: "/Aliens",
      element: <AlienListPage />,
    },
    {
      path: "/Aliens/:alienIndex",
      element: <IndividualAlienPage />,
      breadcrumb: AlienBreadcrumb
    }
]