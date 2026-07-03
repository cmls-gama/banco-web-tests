describe ('Transferencias', () => {
    beforeEach(() =>{
        cy.visit('/')
        cy.fazerLoginComCredenciaisValidas()

    })
    it('Deve transferir quando informo dados e valores válidos', ()=>{
       //Act
        cy.realizarTransferencia('João','Maria','11')

       //Assert
        cy.verificarMensagemNoToast('Transferência realizada!')

    })

    it('Deve apresentar erro quando tentar transferir mais que 5000 sem o token', ()=>{
        
        //Act
        cy.realizarTransferencia('João','Maria','5000.01')

        //Assert
        cy.verificarMensagemNoToast('Autenticação necessária para transferências acima de R$5.000,00.')

    })
})