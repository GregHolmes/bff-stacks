# Symfony - React installation example

This repository is a working example of a [Symfony](https://symfony.com/) - [React](https://reactjs.org/) pairing. There is a single API endpoint `/api` to return `Hello World`, all other routes go through React.

## Installing Symfony

Assuming Composer is installed on your system, in your Terminal run the following command: `composer create-project symfony/skeleton symfony-react`.

This command uses composer to create a new Symfony barebones application under the directory `symfony-react`.

Once Symfony is installed, move into your new project directory with `cd symfony-react`.

Your directory structure should be similar to the image below:

![Directory structure](public/images/symfony-react-directory-structure.png)

For this example we're going to use Symfony's web server bundle. So in your Terminal run: `composer require --dev symfony/web-server-bundle`.

This should allow you to run `php bin/console server:start` which you'll then be able to browse your app locally via `http://127.0.0.1:8000`. You should see a page similar to:

![Welcome](public/images/symfony-react-welcome.png)

Create ApiController.php in `src/Controller/` and replace the contents with the code below. This will allow people to hit the `/api` endpoint to receive the "Hello World" json response:

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    /**
     * @Route("/api", name="api")
     */
    public function index()
    {
        return $this->json(['message' => 'Hello World!']);
    }
}
```

In order to routing to work via annotations, run the following command: `composer require annotations`.

If you go to `http://127.0.0.1:8000/api`, the browser should output the JSON: `{"message":"Hello World!"}`

## Installing Webpack Encore and React

Install Symfony's webpack encore library with the following command: `composer require encore`

Following this, assuming Yarn is installed, run the following command: `yarn install`

We need to install React!: `yarn add react react-dom prop-types`

And finally install a babel library: `yarn add --dev @babel/preset-react`

Create a new Controller which will be used for our React application. In `src/Controller` create a new file `IndexController.php` and paste the following in:

```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class IndexController extends Controller
{
    /**
     * @Route("/{reactRoute}", name="react_path", defaults={"reactRoute": null}, requirements={"page": "^(?!api).+"})
     */
    public function dashboard(): Response
    {
        return $this->render('index.html.twig');
    }
}
```

This controller will route everything that attempts to access the website to the react application, except for the `/api` route.

Twig is required for this to work, run the following command in your Terminal: `composer require twig`

Create a new template file in `templates/` called `index.html.twig` and paste the following code:

```html
{% extends 'base.html.twig' %}

{% block title %} Welcome to Symfony - React {% endblock %}

{% block body %}
  <div>
      <div id="root">Welcome to the React page</div>
  </div>
{% endblock %}

{% block javascripts %}
  <script type="text/javascript" src="{{ asset('build/js/app.js') }}"></script>
{% endblock %}
```

Replace the contents of `assets/js/app.js` with:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>Hello</p>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
```

Inside `webpack.config.js` there is a line commented out: `//.enableReactPreset()`. Uncomment this line because it is required in order to make use of React.

Finally, for the system to use the react files, we'll need to compile them into a build version. Run the following command: `yarn encore dev`
