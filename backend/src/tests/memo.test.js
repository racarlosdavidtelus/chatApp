const messages = require('../content/memo');

describe(' test memory ',()=>{
    const expected = [{ userName: "Carlos David", message: "test message"}];

    it('tests add messages', async() => {
        expect(messages.saveMessage({ userName: "Miles Morales", message: "hola, Carlos"})).toBe("message added")
        expect(messages.saveMessage({ userName: "Carlos David", message: "ya terminaste la tarea"})).toBe("message added")
        expect(messages.saveMessage({ userName: "Miles Morales", message: "ok,gracias"})).toBe("message added")
        expect(messages.getMessages().length).toBe(3);
    });

    it('matches if the userName of the object in position 2 is Miles Morales', () => {
        expect(messages.getMessages()[2].userName).toEqual("Miles Morales");
    });

    it('tests delete messages', async() => {
        expect(messages.saveMessage({ userName: "Carlos David", message: "test message"})).toBe("message added")
        expect(messages.getMessages()).toEqual(expect.arrayContaining(expected));
        expect(messages.getMessages().length).toBe(4);
        expect(messages.deleteMessages()).toBe("messages deleted");
        expect(messages.getMessages().length).toBe(0);
    });

    
})