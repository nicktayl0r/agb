import ApolloClient, { gql } from "apollo-boost";

export function getGraphQLByEnv(env: string) {
	switch (env) {
		case "devEnv":
			return "https://dev-vault.explorelearning.com/graphiql";
		case "stageEnv":
			return "https://stage-vault.explorelearning.com/graphiql";
		case "productionEnv":
			return "https://vault.explorelearning.com/graphiql";
		default:
			return "https://dev-vault.explorelearning.com/graphiql";
	}
}

export class GraphQLClient {
	client: any; //ApolloClient<unknown>;
	constructor(uri: string, auth: string) {
		const headersAuth = auth ? `Bearer ${auth}` : "";
		this.client = new ApolloClient({
			uri: uri,
			headers: {
				authorization: headersAuth
			}
		});
	}

	public async GetResourceActivity(
		resourceActivityId: number,
		resourceId: number
	) {
		const query = gql`
			query($resourceActivityId: Int!, $resourceId: Int!) {
				getResourceActivity(
					latest: true
					resourceActivityId: $resourceActivityId
					resourceId: $resourceId
				) {
					key
					resourceActivityRubrics {
						key
					}
				}
			}
		`;
		const variables = {
			resourceActivityId: resourceActivityId,
			resourceId: resourceId
		};

		return this.client.query({
			query,
			variables
		});
	}

	public async GetResourceActivityTotalPoints(
		resourceActivityId: number,
		resourceId: number
	) {
		const query = gql`
			query($resourceActivityId: Int!, $resourceId: Int!) {
				getResourceActivity(
					latest: true
					resourceActivityId: $resourceActivityId
					resourceId: $resourceId
				) {
					key
					totalPoints
				}
			}
		`;
		const variables = {
			resourceActivityId: resourceActivityId,
			resourceId: resourceId
		};

		return this.client.query({
			query,
			variables
		});
	}

	public CreateResourceActivityRubrics(rubricsJSON: string) {
		const mutation = gql`
			mutation($rubricsJSON: String!) {
				createResourceActivityRubrics(rubricsJSON: $rubricsJSON)
			}
		`;
		const variables = {
			rubricsJSON: rubricsJSON
		};
		return this.client.mutate({
			mutation,
			variables
		});
	}

	public UpdateResourceActivityRubrics(rubricsJSON: string) {
		const mutation = gql`
			mutation($rubricsJSON: String!) {
				updateResourceActivityRubrics(rubricsJSON: $rubricsJSON)
			}
		`;
		// console.log("before", rubricsJSON);
		// rubricsJSON = rubricsJSON.substring(1, rubricsJSON.length - 1); //clip first and last ""
		// console.log("after", rubricsJSON);
		const variables = {
			rubricsJSON: rubricsJSON
		};
		console.log(variables);
		// return;
		return this.client.mutate({
			mutation,
			variables
		});
	}
}
