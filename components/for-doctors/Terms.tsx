export function Terms() {
  return (
    <section className="bg-[#F8FAFC] py-16 px-6">
      <div className="max-w-5xl mx-auto bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl p-8 md:p-10 transition-shadow duration-300 hover:shadow-md">
        <h3 className="font-bold text-lg mb-6 text-gray-900">Условия размещения</h3>
        <ul className="space-y-4 text-[15px] text-gray-700">
          <li className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1">
            <span className="text-yellow-500 mt-1">•</span>
            <span>Размещение доступно только квалифицированным врачам с лицензией</span>
          </li>
          <li className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1">
            <span className="text-yellow-500 mt-1">•</span>
            <span>Вы несете полную ответственность за качество предоставляемых услуг</span>
          </li>
          <li className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1">
            <span className="text-yellow-500 mt-1">•</span>
            <span>Запрещено размещение недостоверной информации и поддельных отзывов</span>
          </li>
          <li className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1">
            <span className="text-yellow-500 mt-1">•</span>
            <span>Мы сдаем страницы в аренду и не несем ответственности за ваши действия как специалиста</span>
          </li>
          <li className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1">
            <span className="text-yellow-500 mt-1">•</span>
            <span>Оплата производится ежемесячно авансом</span>
          </li>
        </ul>
      </div>
    </section>
  );
}