
# PandaGO

This project is a web application developed using **Vue 3** with **TypeScript**, built using **Vite**. The application leverages a **Hexagonal Architecture** pattern and integrates several libraries for enhanced functionality, such as **Tailwind CSS** for design and layout, and **Element Plus** for components like select inputs.

## Recommended IDE Setup

We recommend the following setup to ensure a smooth development experience:
- **VSCode** + **Volar** (and disable **Vetur**)
- **Prettier** and **ESLint** extensions to ensure code formatting and linting.

## Type Support for `.vue` Imports in TypeScript

Since TypeScript cannot natively handle type information for `.vue` imports, we use `vue-tsc` instead of `tsc` for type checking. Additionally, **Volar** is required in your editor to make the TypeScript language service aware of `.vue` types.

## Customize Configuration

You can refer to the official [Vite Configuration Reference](https://vitejs.dev/config/) for more advanced configurations.

---

## Project Setup

### Step 1: Install Dependencies

Run the following command to install all the required dependencies for the project:

```bash
npm install
```

### Step 2: Compile and Hot-Reload for Development

Use the following command to start a development server with hot-reloading:

```bash
npm run dev
```

This will start the app in development mode. You can access it at `http://localhost:3000`.

### Step 3: Type-Check, Compile, and Minify for Production

For production builds, run the following command:

```bash
npm run build
```

This will type-check the project and generate a minified production build in the `dist/` folder.

### Step 4: Lint with ESLint

To lint the project and ensure code quality, use the following command:

```bash
npm run lint
```

This will run **ESLint** to identify and potentially fix any linting issues in the code.

---

## Libraries Used

### 1. **Tailwind CSS** 
Tailwind CSS is used for rapid UI development. It allows us to create a fully responsive, clean, and modern interface by using utility-first CSS classes for styling.

- **Purpose**: Layout, styling, and custom color palettes.
- **Usage**: Utility classes such as `grid`, `flex`, `text-gray-700`, `bg-[#046C4E]`, etc., are used for building the UI.

### 2. **Element Plus**
Element Plus is a Vue 3-based component library used for rich UI elements, such as form controls, select inputs, and more.

- **Purpose**: Used for UI components, particularly select dropdowns and buttons.
- **Usage**: Component imports such as `<el-select>`, `<el-option>`, and other form components.

---

## Project Architecture

This project follows the **Hexagonal Architecture** pattern, also known as **Ports and Adapters**. This architecture emphasizes a clean separation between the core business logic and external systems like APIs, databases, and UI components.

### Key Principles

1. **Domain-Centric**: The core of the application is based on the domain, which contains the essential business logic and models.
2. **Decoupling**: External dependencies (APIs, UI libraries) are decoupled from the business logic using adapters.
3. **Portability**: The architecture ensures the application is flexible and easy to test by isolating the core logic from external dependencies.

### Folder Structure

Here's an overview of the folder structure used in this project:

```plaintext
src/
|-- api/                    # API service setup and communication
|-- assets/                 # Static assets (e.g., images, fonts)
|-- components/             # Reusable UI components
|-- domains/                # Core domain logic (models, repositories, services)
|   |-- character/          # Character domain
|   |-- comic/              # Comic domain
|   |-- creator/            # Creator domain
|   |-- event/              # Event domain
|   |-- serie/              # Series domain
|-- layouts/                # Layout components (e.g., MainLayout)
|-- pages/                  # Page-level components (e.g., HomeView, DetailView)
|-- router/                 # Vue Router configuration
|-- stores/                 # Pinia store setup (Vue's state management)
|-- styles/                 # Global styles, including Tailwind CSS setup
|-- utils/                  # Utility functions
```

### Core Components of Hexagonal Architecture

1. **Domain Models**: These are the core business entities representing concepts like characters, comics, creators, and events. The models encapsulate the core attributes and behaviors related to these entities.
   - Example: `CharacterModel`, `ComicModel`, `CreatorModel`, `EventModel`, `SerieModel`

2. **Adapters**: Adapters serve as intermediaries that handle communication between the domain layer and external systems. In this case, the primary external system is an API that provides the data.
   - **Input Adapters**: Handle requests from the UI or users (e.g., fetching data from APIs).
   - **Output Adapters**: Translate data to and from the domain models.

3. **Ports**: Ports define interfaces that serve as entry points into the domain logic. The domain logic interacts with the adapters through these ports. For example, the repository interfaces serve as ports through which the domain logic fetches data.

4. **Application Services**: The services in the application layer handle coordination between domain logic and external systems. They receive input through the input adapters and pass data to the domain models, where the logic is applied.

### Example: Character Domain

In the **Character** domain, the system handles all logic related to Marvel characters. This includes fetching characters, filtering them, and applying business rules like sorting and date filtering.

- **Character Model**: Represents a character's core attributes like name, description, thumbnail, comics, events, etc.
- **Character Adapter**: Responsible for fetching character data from the external API and converting it into domain models.
- **Character Repository**: Provides methods to fetch and manage character data from the API and pass it to the application logic.

### Schematics of the Hexagonal Architecture

Below is a simplified diagram representing the architecture:

```plaintext
            +-----------------------------+
            |          UI Layer            |
            +-----------------------------+
                       |
                       v
            +-----------------------------+
            |     Application Services     |
            +-----------------------------+
                       |
                       v
            +-----------------------------+
            |       Domain (Core Logic)    |
            +-----------------------------+
                       |
                       v
            +-----------------------------+
            |     Adapters (API, Repos)    |
            +-----------------------------+
```

### Example of Adapter Function

Here’s an example of how a typical adapter works in the project to fetch character data:

```ts
import apiService from '@/api/ApiService'

export const getCharacterById = async (characterId: string) => {
  try {
    const response = await apiService.get(`/characters/${characterId}`)
    return response.data.data.results[0]
  } catch (error) {
    throw new Error('Error fetching character')
  }
}
```

---

## Conclusion

The **PandaGO** project follows a well-defined, scalable architecture suitable for growing applications. It uses a Hexagonal Architecture to ensure the separation of concerns, flexibility, and ease of testing. With **Tailwind CSS** for styling and **Element Plus** for UI components, the project provides a seamless user experience while maintaining a clean and structured codebase.
