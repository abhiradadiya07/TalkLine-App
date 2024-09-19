import vine from "@vinejs/vine";

export const regSchema = vine.object({
  username: vine.string().minLength(2).maxLength(50),
  name: vine.string().minLength(5).maxLength(100),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(32).confirmed(),
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});
