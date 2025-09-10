// TESTE ULTIMATE - Verificar se o fundo mudou
console.log('🧪 TESTE ULTIMATE - VERIFICANDO SE O FUNDO MUDOU');
console.log('================================================');

// Função para testar no browser
function testUltimate() {
  console.log('🔍 Teste 1: Verificar se o canvas existe');
  const canvas = document.getElementById('canvas3d');
  if (!canvas) {
    console.log('❌ FALHOU: Canvas não encontrado');
    return false;
  }
  console.log('✅ Canvas encontrado');

  console.log('🔍 Teste 2: Verificar se o Spline carregou');
  const has3DContent = canvas.width > 0 && canvas.height > 0;
  if (!has3DContent) {
    console.log('❌ FALHOU: Canvas não tem conteúdo 3D');
    return false;
  }
  console.log('✅ Canvas tem conteúdo 3D');

  console.log('🔍 Teste 3: Verificar se o background mudou');
  const computedStyle = window.getComputedStyle(canvas);
  const backgroundColor = computedStyle.backgroundColor;
  console.log('Background color:', backgroundColor);
  
  if (backgroundColor === 'rgb(0, 0, 0)' || backgroundColor === 'black') {
    console.log('✅ SUCESSO: Background está preto!');
    return true;
  } else {
    console.log('❌ FALHOU: Background ainda não está preto');
    console.log('Background atual:', backgroundColor);
    return false;
  }
}

// Executar teste
const result = testUltimate();
console.log('\n📊 RESULTADO DO TESTE:', result ? '✅ PASSOU' : '❌ FALHOU');

if (!result) {
  console.log('\n🔧 PRÓXIMOS PASSOS:');
  console.log('1. Verificar se o monkey patch está sendo aplicado');
  console.log('2. Verificar se o Spline está sobrescrevendo o background');
  console.log('3. Tentar abordagem diferente');
}

// Exportar função para uso no console
window.testUltimate = testUltimate;
console.log('\n💡 Dica: Execute testUltimate() no console para testar novamente');
