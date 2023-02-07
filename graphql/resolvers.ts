export const resolvers = {
  Query: {
    getPosts: async (
      _parent: any,
      _args: any,
      ctx: { prisma: { post: { findMany: () => any } } }
    ) => {
      return await ctx.prisma.post.findMany();
    },
    getPost: async (
      _parent: any,
      args: { id: number },
      ctx: {
        prisma: {
          post: {
            findUnique: (arg0: { where: { id: number } }) => any;
          };
        };
      }
    ) => {
      return await ctx.prisma.post.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    createPost: async (
      _parent: any,
      args: { post: { title: any; content: any; published: any } },
      ctx: {
        prisma: {
          post: {
            create: (arg0: {
              data: { title: any; content: any; published: any };
            }) => any;
          };
        };
      }
    ) => {
      const { title, content, published } = args.post;
      const post = await ctx.prisma.post.create({
        data: {
          title,
          content,
          published,
        },
      });
      return post;
    },
    updatePost: async (
      _parent: any,
      args: { post: { id: any; title: any; content: any; published: any } },
      ctx: {
        prisma: {
          post: {
            update: (arg0: {
              where: { id: any };
              data: { title: any; content: any; published: any };
            }) => any;
          };
        };
      }
    ) => {
      const { id, title, content, published } = args.post;
      const post = await ctx.prisma.post.update({
        where: {
          id,
        },
        data: {
          title,
          content,
          published,
        },
      });
      return post;
    },
    deletePost: async (
      _parent: any,
      args: { post: { id: any } },
      ctx: {
        prisma: { post: { delete: (arg0: { where: { id: any } }) => any } };
      }
    ) => {
      const { id } = args.post;
      const post = await ctx.prisma.post.delete({
        where: {
          id,
        },
      });
      return post;
    },
  },
};
