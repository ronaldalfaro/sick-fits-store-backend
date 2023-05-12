import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('ADDING TO CART!');
  console.log(productId);
  //1 query the current user see if the are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  console.log(sesh.itemId);
  //2 query the current user cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  });
  console.log(allCartItems);
  const [existingCartItem] = allCartItems;
  console.log(existingCartItem);
  if (existingCartItem) {
    console.log(
      `There is already ${existingCartItem.quantity}, increment by 1!`
    );
    //3 see if the current item is in their cart
    //4 if it is, increment
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  //4 if it is not, create a new cart item
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
  });
}

export default addToCart;
