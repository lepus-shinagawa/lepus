# lepus-subql

## Preparation

Install SubQuery CLI globally on your terminal by using NPM:

```
npm install -g @subql/cli
```

Run help to see available commands and usage provide by CLI

```
subql help
```

Under the project directory, run following command to install all the dependency.

```
yarn install
```

## Configure your project

In the starter package, we have provided a simple example of project configuration. You will be mainly working on the following files:

- The Manifest in `project.yaml`
- The GraphQL Schema in `schema.graphql`
- The Mapping functions in `src/mappings/` directory

For more information on how to write the SubQuery,
check out our doc section on [Define the SubQuery](https://doc.subquery.network/define_a_subquery.html)

#### Code generation

In order to index your SubQuery project, it is mandatory to build your project first.
Run this command under the project directory.

```
yarn codegen
```

## Build the project

In order to deploy your SubQuery project to our hosted service, it is mandatory to pack your configuration before upload.
Run pack command from root directory of your project will automatically generate a `your-project-name.tgz` file.

```
yarn build
```

## Indexing and Query

#### Run required systems in docker

Under the project directory run following command:

```
docker-compose pull && docker-compose up
```

#### Query the project

Open your browser and head to `http://localhost:3001`.

Finally, you should see a GraphQL playground is showing in the explorer and the schemas that ready to query.

For the `subql-starter` project, you can try to query with the following code to get a taste of how it works.

```graphql
{
  query {
    starterEntities(first: 10) {
      nodes {
        field1
        field2
        field3
      }
    }
  }
}
```
