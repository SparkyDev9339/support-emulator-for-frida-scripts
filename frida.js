const { Arm64Writer, Arm64Relocator } = require('frida-gum');

// Создаем экземпляр Arm64Writer для записи инструкций
const writer = new Arm64Writer();

// Записываем инструкции в память
writer.putLdrRegU64('x0', 0x12345678);
writer.putStrRegRegOffset('x0', 'x1', 0);

// Получаем указатель на записанные инструкции
const code = writer.toArray();

// Создаем экземпляр Arm64Relocator для переноса инструкций
const relocator = new Arm64Relocator(code, writer);

// Переносим инструкции в новую область памяти
const relocatedCode = relocator.relocate(writer);

// Создаем функцию из перенесенного кода
const fn = new NativeFunction(relocatedCode, 'void', ['pointer', 'pointer']);

// Вызываем функцию
fn(ptr(0x1000), ptr(0x2000));
