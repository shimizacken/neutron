# neutron

![neutron](./src/assets/logo/neutron-logo.png)

## Usage example

```typescript
const colorsNeutron = createNeutron<string>();

const abandonWatcher = colorsNeutron.watch((next, previous) => {
  console.log("next", next, "previous", previous);
});

console.clear();
colorsNeutron.emit("red"); // next red previous undefined
colorsNeutron.emit("green"); // next green previous red

abandonWatcher();

colorsNeutron.emit("orange"); // no emit

numbersNeutron.watch((num) => {
  console.log(num);
});
```
