function uuid() {
  return `id${Math.random().toString(16).slice(2)}`;
}

export default uuid;
