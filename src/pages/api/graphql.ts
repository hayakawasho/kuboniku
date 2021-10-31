import { ApolloServer } from "apollo-server-micro"
import { NextApiResponse, NextApiRequest } from "next"

const server = new ApolloServer({})

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = server.createHandler({
  path: "/api/graphql",
})

export default (req: NextApiRequest, res: NextApiResponse) => {
  return handler(req, res)
}
