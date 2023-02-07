import {
  FieldResolver,
  extendType,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from "nexus";

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.nonNull.id("id");
    t.string("title");
    t.string("content");
  },
});

// ************************************************************************************************************************
// ** QUERIES ***********************************************************************************************************
// ************************************************************************************************************************

export const GetAllPostsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("allPosts", {
      type: "Post",
      resolve(_root, args, ctx) {
        return ctx.prisma.post.findMany();
      },
    });
  },
});

export const GetSinglePostQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("post", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

// ************************************************************************************************************************
// ** MUTATIONS ***********************************************************************************************************
// ************************************************************************************************************************

// ************************************************************************************************************************
// ** CREATE **************************************************************************************************************
// ************************************************************************************************************************
const CreatePostInput = inputObjectType({
  name: "CreatePostInput",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("content");
  },
});
const CreatePostResponse = objectType({
  name: "CreatePostResponse",
  definition(t) {
    t.nonNull.string("message");
    t.nonNull.boolean("error");
  },
});

const CreatePostResolver: FieldResolver<"Mutation", "CreateUserInput"> = async (
  _root,
  args,
  ctx
) => {
  const { title, content } = args.data;
  const post = await ctx.prisma.post.create({
    data: {
      title: title,
      content: content,
    },
  });
  return {
    message: "User created successfully",
    error: false,
  };
};

export const CreatePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPost", {
      type: CreatePostResponse,
      args: {
        data: CreatePostInput,
      },
      resolve: CreatePostResolver,
    });
  },
});

// ************************************************************************************************************************
// ** UPDATE **************************************************************************************************************
// ************************************************************************************************************************

export const UpdatePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updatePost", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        content: stringArg(),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.post.update({
          where: {
            id: args.id,
          },
          data: {
            title: args.title,
            content: args.content,
          },
        });
      },
    });
  },
});

// ************************************************************************************************************************
// ** DELETE **************************************************************************************************************
// ************************************************************************************************************************
export const DeletePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deletePost", {
      type: "Post",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.post.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});
