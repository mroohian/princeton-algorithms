export function arrayRotate(list: number[], rotateAmount: number): void {
  const copy = [...list];

  rotateAmount = rotateAmount % list.length;

  for (let i = 0; i < list.length; i++) {
    list[i] = copy[(i - rotateAmount + list.length) % list.length];
  }  
}
