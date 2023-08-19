import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class Blog {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  url: string;

  // @Prop()
  // image: {
  //   public_url: string;
  //   url: string;
  // };
}
export const BlogSchema = SchemaFactory.createForClass(Blog);
