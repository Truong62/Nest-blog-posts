export class PostModelDTO {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(init: {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = init.id;
    this.title = init.title;
    this.content = init.content;
    this.authorId = init.authorId;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }

  static fromPersistence(record: {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
  }): PostModelDTO {
    return new PostModelDTO({
      id: record.id,
      title: record.title,
      content: record.content,
      authorId: record.authorId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  toPlain(): {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      authorId: this.authorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class CreatePostDTO {
  title: string;
  content: string;

  constructor(init: { title: string; content: string }) {
    this.title = init.title;
    this.content = init.content;
  }
}

export class UpdatePostDTO {
  title?: string;
  content?: string;

  constructor(init: { title?: string; content?: string }) {
    this.title = init.title;
    this.content = init.content;
  }
}

export const mapPostsToDTO = (
  records: Array<{
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
  }>,
): PostModelDTO[] => records.map((record) => PostModelDTO.fromPersistence(record));
