import { colorsNeutron, numbersNeutron } from "./examples/neutrons";

const abandonWatcher = colorsNeutron.watch((next, previous) => {
  console.log("next", next, "previous", previous);
});

console.clear();
colorsNeutron.emit("red");
colorsNeutron.emit("green");
colorsNeutron.emit("blue");
colorsNeutron.emit("pink");

abandonWatcher();

colorsNeutron.emit("orange");

numbersNeutron.watch((num) => {
  console.log(num);
});

numbersNeutron.emit(100);
numbersNeutron.emit(101);
numbersNeutron.emit(102);
