/*
 * Copyright (C) 2026 Xibo Signage Ltd
 *
 * Xibo - Digital Signage - https://xibosignage.com
 *
 * This file is part of Xibo.
 *
 * Xibo is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Xibo is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Xibo.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { SERVICE_CARDS, type ServiceCard } from './WelcomeConfig';

import Button from '@/components/ui/Button';
import { useUserContext } from '@/context/UserContext';
import { markWelcomeSeen } from '@/services/welcomeApi';
import { hasFeature } from '@/utils/permissions';

export default function Welcome() {
  const { t } = useTranslation();
  const { user } = useUserContext();

  useEffect(() => {
    markWelcomeSeen().catch(() => {});
  }, []);

  const hasRequiredFeatures = (featureFlags: string[]) => {
    if (!user) return false;
    return featureFlags.some((flag) => hasFeature(user, flag));
  };

  const visibleServiceCards = SERVICE_CARDS.filter((card) =>
    hasRequiredFeatures(card.featureFlags),
  );

  const renderServiceCardLinks = (card: ServiceCard) => {
    return card.links.map((link) => {
      const variant = link.variant ?? 'primary';
      return (
        <Link key={link.to} to={link.to}>
          <Button variant={variant}>{t(link.labelKey)}</Button>
        </Link>
      );
    });
  };

  return (
    <div className="relative h-full overflow-y-auto">
      {/* Hero Section */}
      <section className="flex py-14 bg-gradient-to-b from-blue-50/50 to-transparent border-b border-gray-100">
        <div className="flex flex-col items-center max-w-3xl mx-auto text-center px-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-4">
            SUSTAINAMOTION デジタルサイネージ
          </span>
          <h2 className="mb-3 text-3xl font-bold text-gray-900 tracking-tight">
            {t('Welcome to SUSTAINAMOTION CMS', 'SUSTAINAMOTION CMS へようこそ')}
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl text-sm sm:text-base">
            {t(
              'コンテンツ管理システム（CMS）へようこそ。ディスプレイ端末の管理、メディア素材のアップロード、多彩なレイアウトデザインの作成、そして柔軟な配信スケジュール設定まで、直感的な操作で行えます。',
            )}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto flex flex-col gap-6 py-8 px-5">
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleServiceCards.map((card) => (
            <div
              key={card.serviceId}
              id={card.serviceId}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow justify-between"
            >
              <div className="flex gap-4 items-start mb-4">
                <div className="shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                  <img
                    src={card.imageUrl}
                    alt={t(card.titleKey)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-lg font-bold text-gray-800">{t(card.titleKey)}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{t(card.descriptionKey)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                {renderServiceCardLinks(card)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
