function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Kayıt Ol
document.getElementById('kayitForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const isim = document.getElementById('isim').value;
  const soyisim = document.getElementById('soyisim').value;
  const email = document.getElementById('email').value;
  const okul = document.getElementById('okul').value;

  let kullanicilar = JSON.parse(localStorage.getItem('kullanicilar')) || [];
  kullanicilar.push({ isim, soyisim, email, okul, puan: 0 });
  localStorage.setItem('kullanicilar', JSON.stringify(kullanicilar));
  alert('Kayıt başarıyla tamamlandı!');
  showSection('hedefler');
});

// Veri Girişi
document.getElementById('veriGirisiForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const atikTuru = document.getElementById('atik_turu').value;
  const miktar = parseFloat(document.getElementById('miktar').value);
  const ayristrildi = document.getElementById('ayristirildi').value === '1';

  let puan = miktar * (ayristrildi ? 2 : 1);
  let toplamPuan = parseFloat(localStorage.getItem('toplamPuan') || '0');
  toplamPuan += puan;
  localStorage.setItem('toplamPuan', toplamPuan);

  // Çevre Dostu Katkı
  let cevreDostu = parseFloat(localStorage.getItem('cevreDostu') || '0');
  cevreDostu += miktar;
  localStorage.setItem('cevreDostu', cevreDostu);

  // Toplam puanı ve çevre dostu katkıyı güncelle
  document.getElementById('toplamPuan').textContent = toplamPuan;
  document.getElementById('cevreDostu').textContent = cevreDostu;

  alert('Atık veri girişi başarılı! Ekolojik krediniz güncellenmiştir.');
});

// Sayfa yüklendiğinde, varsa mevcut toplam puanı ve çevre dostu katkıyı yükle
document.addEventListener('DOMContentLoaded', function() {
  const toplamPuan = localStorage.getItem('toplamPuan') || '0';
  const cevreDostu = localStorage.getItem('cevreDostu') || '0';

  document.getElementById('toplamPuan').textContent = toplamPuan;
  document.getElementById('cevreDostu').textContent = cevreDostu;
});
